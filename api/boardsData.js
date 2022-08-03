import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

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

const getBoardsByPinTheyAllContain = (pinFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/pins/${pinFirebaseKey}.json`)
    .then((response) => {
      const gatherBoardsPromises = response.data.containedByBoards.map((boardFirebaseKey) => getBoardByFirebaseKey(boardFirebaseKey));
      Promise.all(gatherBoardsPromises).then((values) => resolve(Object.values(values)));
    })
    .catch((error) => reject(error));
});

export {
  getBoardByFirebaseKey,
  getBoardsByUser,
  getBoardsByPinTheyAllContain,
};
