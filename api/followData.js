import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getWhoUserFollows = (handle) => new Promise((resolve, reject) => {
    axios.get(`${dbUrl}/follows.json?orderBy="$key"&startAt="${handle}"`)
      .then((response) => resolve(Object.values(response.data)))
      .catch((error) => reject(error));
  });


const getWhoFollowsUser = (handle) => new Promise((resolve, reject) => {
    axios.get(`${dbUrl}/follows.json?orderBy="$value"&equalTo="${handle}"`)
      .then((response) => {
        resolve(Object.keys(response.data).map((string) => string.split("--")[0]))
      })
      .catch((error) => reject(error));
  });

export {
    getWhoUserFollows,
    getWhoFollowsUser
}