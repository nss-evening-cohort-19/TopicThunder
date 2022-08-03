import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getPinByFirebaseKey = (pinFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/pins/${pinFirebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getPinsByUser = (userFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/pins.json?orderBy="user"&equalTo="${userFirebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getPinsByBoard = (boardFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/boards/${boardFirebaseKey}.json`)
    .then((response) => {
      const gatherPinsPromises = response.data.pins.map((pinFirebaseKey) => getPinByFirebaseKey(pinFirebaseKey));
      Promise.all(gatherPinsPromises).then((values) => resolve(Object.values(values)));
    })
    .catch((error) => reject(error));
});

export {
  getPinByFirebaseKey,
  getPinsByUser,
  getPinsByBoard,
};
