import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getUserByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users.json?orderBy="uid"&"equalTo"="${uid}"`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getUserByFirebaseKey = (userFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users/${userFirebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createUser = (userObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/users.json`, userObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/users/${response.data.name}.json`, payload)
        .then((secondResponse) => resolve(secondResponse));
    }).catch(reject);
});

const updateUser = (userFirebaseKey, userObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/users/${userFirebaseKey}.json`, userObj)
    .then((response) => resolve(response)).catch(reject);
});

/*
Example userObj:
{
  "displayName": "George Harrison",
  "uid": "user.uid",
  "image": "https://faroutmagazine.co.uk/static/uploads/2022/07/How-to-play-drums-like-Ringo-Starr.jpg"
}
*/

const addFollowRelation = (followerFirebaseKey, followeeFirebaseKey) => {
  let followerIsCurrentlyFollowing = [];
  let followeeIsCurrentlyBeingFollowedBy = [];
  const followersNewFollowingArray = [followeeFirebaseKey];
  const followeesNewFollowedByArray = [followerFirebaseKey];
  Promise.all([getUserByFirebaseKey(followerFirebaseKey), getUserByFirebaseKey(followeeFirebaseKey)])
    .then(([followerObj, followeeObj]) => {
      console.warn(followerObj);
      if (followerObj.usersFollowed) {
        followerIsCurrentlyFollowing = followerObj.usersFollowed;
        followersNewFollowingArray.unshift(...followerIsCurrentlyFollowing);
      }
      if (followeeObj.usersFollowed) {
        followeeIsCurrentlyBeingFollowedBy = followeeObj.usersFollowed;
        followeesNewFollowedByArray.unshift(...followeeIsCurrentlyBeingFollowedBy);
      }
      const newFollowerObj = { usersFollowed: followersNewFollowingArray };
      const newFolloweeObj = { followedBy: followeesNewFollowedByArray };
      Promise.all([updateUser(followerFirebaseKey, newFollowerObj), updateUser(followeeFirebaseKey, newFolloweeObj)])
        .then().catch();
    }).catch();
};

const removeFollowRelation = (followerFirebaseKey, followeeFirebaseKey) => {
  let followerIsCurrentlyFollowing = [];
  let followeeIsCurrentlyBeingFollowedBy = [];
  let followersNewFollowingArray = [];
  let followeesNewFollowedByArray = [];
  Promise.all([getUserByFirebaseKey(followerFirebaseKey), getUserByFirebaseKey(followeeFirebaseKey)])
    .then(([followerObj, followeeObj]) => {
      if (followerObj.usersFollowed) {
        followerIsCurrentlyFollowing = followerObj.usersFollowed;
        followersNewFollowingArray = followerIsCurrentlyFollowing;
      }
      if (followeeObj.usersFollowed) {
        followeeIsCurrentlyBeingFollowedBy = followeeObj.usersFollowed;
        followeesNewFollowedByArray = followeeIsCurrentlyBeingFollowedBy;
      }
      followersNewFollowingArray = followersNewFollowingArray.filter((user) => user !== followeeFirebaseKey);
      followeesNewFollowedByArray = followeesNewFollowedByArray.filter((user) => user !== followerFirebaseKey);
      const newFollowerObj = { usersFollowed: followersNewFollowingArray };
      const newFolloweeObj = { followedBy: followeesNewFollowedByArray };
      Promise.all([updateUser(followerFirebaseKey, newFollowerObj), updateUser(followeeFirebaseKey, newFolloweeObj)])
        .then().catch();
    }).catch();
};

export {
  getUserByUid,
  getUserByFirebaseKey,
  createUser,
  addFollowRelation,
  removeFollowRelation,
};
