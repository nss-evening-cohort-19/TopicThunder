import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getAllPins = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/pins.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getPinByFirebaseKey = (pinFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/pins/${pinFirebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getPinsByUser = (userHandle) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/pins.json?orderBy="user"&equalTo="${userHandle}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const deletePin = (pinFirebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/pins/${pinFirebaseKey}.json`)
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const createPin = (pinObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/pins.json`, pinObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/pins/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const updatePin = (pinObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/pins/${pinObj.firebaseKey}.json`, pinObj)
    .then(() => getAllPins(pinObj.uid).then(resolve))
    .catch((error) => reject(error));
});

export {
  getAllPins,
  getPinByFirebaseKey,
  getPinsByUser,
  deletePin,
  createPin,
  updatePin,
};
