import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getPinsContainedByGivenBoard = (boardFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/collections.json?orderBy="$key"&startAt="${boardFirebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getBoardsThatContainGivenPin = (pinFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/collections.json?orderBy="$value"&equalTo="${pinFirebaseKey}"`)
    .then((response) => {
      resolve(Object.keys(response.data).map((string) => string.split('==')[0]));
    })
    .catch((error) => reject(error));
});

export {
  getPinsContainedByGivenBoard,
  getBoardsThatContainGivenPin,
};
