import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getUserByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getUserByHandle = (handle) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users/${handle}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createUser = (userObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/users.json`, userObj)
    .then((response) => resolve(response)).catch(reject);
});
/*
YOU MUST PROVIDE THE USER OBJECT AS AN OBJECT WITHIN AN OBJECT, AND
THE PRIMARY KEY (AKA FIREBASE KEY) NEEDS TO BE PROVIDED, AND MAKE IT THE SAME AS THE HANDLE
For example:
{
  "cartyp": {
    "displayName": "Paul McCartney",
    "firebaseKey": "paulUid",
    "image": "https://s.yimg.com/ny/api/res/1.2/TKcCfYY1abua5Vj6Q1xVvw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQ4MA--/https://s.yimg.com/uu/api/res/1.2/aUBIhmB.aboNwthBs_VkVg--~B/aD05MDA7dz0xMjAwO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/the_independent_577/a8b29da8b79c6dbc4a2ce7122fb3604b",
    "uid": "paulUid",
    "handle": "cartyp"
  }
}
*/

const updateUser = (handle, userObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/users/${handle}.json`, userObj)
    .then((response) => resolve(response)).catch(reject);
});

const addFollowRelationship = (followerFirebaseKey, followeeFirebaseKey) => {
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

const removeFollowRelationship = (followerFirebaseKey, followeeFirebaseKey) => {
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
  getUserByHandle,
  createUser,
  addFollowRelationship,
  removeFollowRelationship,
};
