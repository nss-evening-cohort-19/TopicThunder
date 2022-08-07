import { getBoardPins, getBoardByFirebaseKey, deleteSingleBoard } from './boardsData';
import { getSinglePin, deletePin } from './pinsData';

const viewPinDetails = (pinFirebaseKey) => new Promise((resolve, reject) => {
  getSinglePin(pinFirebaseKey)
    .then((pinObject) => {
      getBoardByFirebaseKey(pinObject.cover)
        .then((boardObject) => {
          resolve({ boardObject, ...pinObject });
        });
    }).catch((error) => reject(error));
});

const viewBoardDetails = (boardFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getBoardByFirebaseKey(boardFirebaseKey), getBoardPins(boardFirebaseKey)])
    .then(([boardObject, boardPinsArray]) => {
      resolve({ ...boardObject, books: boardPinsArray });
    }).catch((error) => reject(error));
});

const deleteBoardPins = (boardId) => new Promise((resolve, reject) => {
  getBoardPins(boardId).then((pinsArray) => {
    const deletePinPromises = pinsArray.map((pin) => deletePin(pin.firebaseKey));

    Promise.all(deletePinPromises).then(() => {
      deleteSingleBoard(boardId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewPinDetails, viewBoardDetails, deleteBoardPins };
