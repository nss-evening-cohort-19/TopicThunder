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

const getBoardsByUser = (userHandle) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/boards.json?orderBy="user"&equalTo="${userHandle}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const deleteBoardShallow = (boardFirebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/boards/${boardFirebaseKey}.json`)
    .then(resolve).catch(reject);
});

export {
  getAllBoards,
  getBoardByFirebaseKey,
  getBoardsByUser,
  deleteBoardShallow,
};
