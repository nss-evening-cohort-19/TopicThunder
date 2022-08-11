import axios from 'axios';
import { deleteBoardShallow } from './boardsData';
import { getBoardsThatContainGivenPin, getPinsContainedByGivenBoard, removePinFromBoard } from './collectionsData';
import { getWhoFollowsUser, getWhoUserFollows, removeFollow } from './followsData';
import { deletePinShallow } from './pinsData';
import { deleteUserShallow } from './usersData';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const mergedGetBoardsByUser = (userHandle) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/boards.json?orderBy="user"&equalTo="${userHandle}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const mergedGetPinsByUser = (userHandle) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/pins.json?orderBy="user"&equalTo="${userHandle}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const deletePin = (pinFirebaseKey) => new Promise((resolve, reject) => {
  getBoardsThatContainGivenPin(pinFirebaseKey).then((response) => {
    const removePinFromBoards = response.map((board) => removePinFromBoard(pinFirebaseKey, board.firebaseKey));
    Promise.all(removePinFromBoards).then(() => {
      deletePinShallow(pinFirebaseKey).then(resolve);
    }).catch(reject);
  });
});

const deleteBoard = (boardFirebaseKey) => new Promise((resolve, reject) => {
  getPinsContainedByGivenBoard(boardFirebaseKey).then((response) => {
    const removePinsFromBoard = response.map((pin) => removePinFromBoard(pin.firebaseKey, boardFirebaseKey));
    Promise.all(removePinsFromBoard).then(() => {
      deleteBoardShallow(boardFirebaseKey).then(resolve);
    }).catch(reject);
  });
});

const deleteUser = (userHandle) => new Promise((resolve, reject) => {
  getWhoFollowsUser(userHandle).then((arrayOfFollowers) => {
    const deleteIncomingFollows = arrayOfFollowers.map((incomingFollowUser) => removeFollow(incomingFollowUser.handle, userHandle));
    Promise.all(deleteIncomingFollows).then(() => {
      getWhoUserFollows(userHandle).then((arrayOfFollows) => {
        const deleteOutgoingFollows = arrayOfFollows.map((outgoingFollowUser) => removeFollow(userHandle, outgoingFollowUser.handle));
        Promise.all(deleteOutgoingFollows).then(() => {
          mergedGetPinsByUser(userHandle).then((arrayOfPinObjects) => {
            const deleteUsersPins = arrayOfPinObjects.map((userPin) => deletePin(userPin.firebaseKey));
            Promise.all(deleteUsersPins).then(() => {
              mergedGetBoardsByUser(userHandle).then((arrayOfBaordObjects) => {
                const deleteUsersBoards = arrayOfBaordObjects.map((userBoard) => deleteBoard(userBoard.firebaseKey));
                Promise.all(deleteUsersBoards).then(() => {
                  deleteUserShallow(userHandle).then(resolve);
                }).catch(reject);
              });
            }).catch(reject);
          });
        }).catch(reject);
      });
    }).catch(reject);
  });
});

export {
  deletePin,
  deleteBoard,
  deleteUser,
  mergedGetPinsByUser,
};
