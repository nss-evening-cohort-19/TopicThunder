import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getAllBoards = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/boards.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getBoardByFirebaseKey = (boardFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/boards/${boardFirebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getBoardsByUser = (userFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/boards.json?orderBy="user"&equalTo="${userFirebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});
const deleteSingleBoard = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/boards/${firebaseKey}.json`, uid)
    .then(() => {
      getAllBoards(uid).then((boardsArray) => resolve(boardsArray));
    })
    .catch((error) => reject(error));
});
const getBoardPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/pins.json?orderBy= "board_id" &equalTo="${boardId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});
export {
  getAllBoards,
  getBoardByFirebaseKey,
  getBoardsByUser,
  deleteSingleBoard,
  getBoardPins,
};
