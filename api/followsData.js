import axios from 'axios';
import { clientCredentials } from '../utils/client';
import { createNotification } from './notificationsData';
import { getUserByHandle } from './usersData';

const dbUrl = clientCredentials.databaseURL;

const getWhoUserFollows = (handle) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/follows.json?orderBy="$key"&startAt="${handle}"&endAt="${handle}z"`)
    .then((response) => {
      const getUsersFromHandles = Object.values(response.data).map((userHandle) => getUserByHandle(userHandle));
      Promise.all(getUsersFromHandles).then(resolve).catch(reject);
    })
    .catch((error) => reject(error));
});

const getWhoFollowsUser = (handle) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/follows.json?orderBy="$value"&equalTo="${handle}"`)
    .then((response) => {
      const getUsersFromHandles = Object.keys(response.data).map((string) => string.split('==')[0]).map((userHandle) => getUserByHandle(userHandle));
      Promise.all(getUsersFromHandles).then(resolve).catch(reject);
    })
    .catch((error) => reject(error));
});

const addFollow = (followerHandle, followedHandle) => new Promise((resolve, reject) => {
  const followKeyValue = `{"${followerHandle}==${followedHandle}" : "${followedHandle}"}`;
  axios.patch(`${dbUrl}/follows.json`, followKeyValue)
    .then((response) => resolve(response))
    .catch((error) => reject(error));
  createNotification(followedHandle, followerHandle, 'Followed you');
});

const removeFollow = (followerHandle, followedHandle) => new Promise((resolve, reject) => {
  const followKey = `${followerHandle}==${followedHandle}`;
  axios.delete(`${dbUrl}/follows/${followKey}.json`)
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getWhoUserFollows,
  getWhoFollowsUser,
  addFollow,
  removeFollow,
};
