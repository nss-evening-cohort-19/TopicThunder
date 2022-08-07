import axios from 'axios';
import { clientCredentials } from '../utils/client';
import { getPinsContainedByGivenBoard } from './collectionsData';
import { getUserByHandle } from './usersData';

const dbUrl = clientCredentials.databaseURL;

const getAllBoards = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/boards.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getSingleBoardDetails = (boardFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/boards/${boardFirebaseKey}.json`)
    .then((originalBoardObject) => {
      getPinsContainedByGivenBoard(boardFirebaseKey).then((arrayOfPinObjects) => {
        getUserByHandle(originalBoardObject.user).then((userObj) => {
          const newBoardObject = originalBoardObject;
          newBoardObject.user = userObj;
          newBoardObject.pins = arrayOfPinObjects;
          resolve(newBoardObject);
        });
      });
    })
    .catch((error) => reject(error));
});

const getMultipleBoardDetails = (userHandle) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/boards.json?orderBy="user"&equalTo="${userHandle}"`)
    .then((arrayOfBoards) => {
      const boardDetailPromises = arrayOfBoards.map((board) => getSingleBoardDetails(board));
      Promise.all(boardDetailPromises).then(resolve).catch(reject);
    })
    .catch((error) => reject(error));
});

const deleteBoardShallow = (boardFirebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/boards/${boardFirebaseKey}.json`)
    .then(resolve).catch(reject);
});

const createBoard = (boardObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/boards.json`, boardObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/boards/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const updateBoard = (boardObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/boards/${boardObj.firebaseKey}.json`, boardObj)
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getAllBoards,
  getSingleBoardDetails,
  getMultipleBoardDetails,
  deleteBoardShallow,
  createBoard,
  updateBoard,
};
