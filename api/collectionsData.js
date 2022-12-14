/* eslint-disable import/no-cycle */
import axios from 'axios';
import { clientCredentials } from '../utils/client';
import { getSingleBoardDetails } from './boardsData';
import { createNotification } from './notificationsData';
import { getSinglePinDetails } from './pinsData';

const dbUrl = clientCredentials.databaseURL;

const collectionsGetPinByFirebaseKey = (pinFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/pins/${pinFirebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const collectionsGetBoardByFirebaseKey = (boardFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/boards/${boardFirebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getPinsContainedByGivenBoard = (boardFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/collections.json?orderBy="$key"&startAt="${boardFirebaseKey}"&endAt="${boardFirebaseKey}z"`)
    .then((response) => {
      const getPinsFromKeys = Object.values(response.data).map((firebaseKey) => collectionsGetPinByFirebaseKey(firebaseKey));
      Promise.all(getPinsFromKeys).then(resolve).catch(reject);
    })
    .catch((error) => reject(error));
});

const getBoardsThatContainGivenPin = (pinFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/collections.json?orderBy="$value"&equalTo="${pinFirebaseKey}"`)
    .then((response) => {
      const getBoardsFromKeys = Object.keys(response.data).map((string) => string.split('==')[0]).map((firebaseKey) => collectionsGetBoardByFirebaseKey(firebaseKey));
      Promise.all(getBoardsFromKeys).then(resolve).catch(reject);
    })
    .catch((error) => reject(error));
});

const addPinToBoard = (pinFirebaseKey, boardFirebaseKey) => new Promise((resolve, reject) => {
  const collectionKeyValue = `{"${boardFirebaseKey}==${pinFirebaseKey}" : "${pinFirebaseKey}"}`;
  axios.patch(`${dbUrl}/collections.json`, collectionKeyValue)
    .then((response) => resolve(response))
    .catch((error) => reject(error));
  getSingleBoardDetails(boardFirebaseKey).then((boardObj) => {
    getSinglePinDetails(pinFirebaseKey).then((pinObj) => {
      if (pinObj.user.handle !== boardObj.user.handle) {
        createNotification(pinObj.user.handle, boardObj.user.handle, 'Saved your pin', `../pin/${pinFirebaseKey}`);
      }
    });
  });
});

const removePinFromBoard = (pinFirebaseKey, boardFirebaseKey) => new Promise((resolve, reject) => {
  const collectionKey = `${boardFirebaseKey}==${pinFirebaseKey}`;
  axios.delete(`${dbUrl}/collections/${collectionKey}.json`)
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  collectionsGetPinByFirebaseKey,
  collectionsGetBoardByFirebaseKey,
  getPinsContainedByGivenBoard,
  getBoardsThatContainGivenPin,
  addPinToBoard,
  removePinFromBoard,
};
