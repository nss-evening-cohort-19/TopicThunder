import axios from 'axios';
import { clientCredentials } from '../utils/client';
import { addPinToBoard, getBoardsThatContainGivenPin } from './collectionsData';
import { getUserByHandle } from './usersData';

const dbUrl = clientCredentials.databaseURL;

const getAllPins = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/pins.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getSinglePinDetails = (pinFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/pins/${pinFirebaseKey}.json`)
    .then((originalPinObject) => {
      getBoardsThatContainGivenPin(pinFirebaseKey).then((arrayOfBoardObjects) => {
        getUserByHandle(originalPinObject.data.user).then((userObj) => {
          const newPinObject = originalPinObject.data;
          newPinObject.user = userObj;
          newPinObject.boards = arrayOfBoardObjects;
          resolve(newPinObject);
        });
      });
    })
    .catch((error) => reject(error));
});

const getMultiplePinDetails = (userHandle) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/pins.json?orderBy="user"&equalTo="${userHandle}"`)
    .then((arrayOfPins) => {
      const pinDetailPromises = (Object.values(arrayOfPins.data)).map((pin) => getSinglePinDetails(pin.firebaseKey));
      Promise.all(pinDetailPromises).then(resolve).catch(reject);
    })
    .catch((error) => reject(error));
});

const deletePinShallow = (pinFirebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/pins/${pinFirebaseKey}.json`)
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const createPin = (pinObj, boardToConnect) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/pins.json`, pinObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/pins/${response.data.name}.json`, payload)
        .then(() => {
          addPinToBoard(response.data.name, boardToConnect).then(resolve);
        });
    }).catch(reject);
});

const updatePin = (pinObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/pins/${pinObj.firebaseKey}.json`, pinObj)
    .then(() => getAllPins(pinObj.uid).then(resolve))
    .catch((error) => reject(error));
});

export {
  getAllPins,
  getSinglePinDetails,
  getMultiplePinDetails,
  deletePinShallow,
  createPin,
  updatePin,
};
