import axios from 'axios';
import { clientCredentials } from '../utils/client';
import { getBoardsByUser } from './boardsData';
import { getWhoFollowsUser, getWhoUserFollows, removeFollow } from './followsData';
import { deletePin, getPinsByUser } from './pinsData';

const dbUrl = clientCredentials.databaseURL;

const deleteUser = (userHandle) => new Promise((resolve, reject) => {
  getWhoFollowsUser(userHandle).then((arrayOfHandles) => {
    const deleteIncomingFollows = arrayOfHandles.map((incomingFollowHandle) => removeFollow(incomingFollowHandle, userHandle));
    Promise.all(deleteIncomingFollows).then(resolve).catch(reject);
  });
  getWhoUserFollows(userHandle).then((arrayOfHandles) => {
    const deleteOutgoingFollows = arrayOfHandles.map((outgoingFollowHandle) => removeFollow(userHandle, outgoingFollowHandle));
    Promise.all(deleteOutgoingFollows).then(resolve).catch(reject);
  });
  getPinsByUser(userHandle).then((arrayOfPinObjects) => {
    const deleteUsersPins = arrayOfPinObjects.map((userPin) => deletePin(userPin.pinFirebaseKey));
    Promise.all(deleteUsersPins).then(resolve).catch(reject);
  });
  getBoardsByUser(userHandle).then((arrayOfBaordObjects) => {
    const deleteUsersBoards = arrayOfBaordObjects.map((userBoard) => )
  });
});

const removePin = (pinFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/follows.json?orderBy="$value"&equalTo="${handle}"`)
    .then((response) => {
      resolve(Object.keys(response.data).map((string) => string.split('==')[0]));
    })
    .catch((error) => reject(error));
});

const removeBoard = (boardFirebaseKey) => new Promise((resolve, reject) => {
  const followKeyValue = `{"${followerHandle}==${followedHandle}" : "${followedHandle}"}`;
  axios.patch(`${dbUrl}/follows.json`, followKeyValue)
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  deleteUser,
  removePin,
  removeBoard,
};
