import React from 'react';
// import Link from 'next/link';
import PropTypes from 'prop-types';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import { deleteBoard } from '../api/boardsData';

function BoardCard({ boardObj }) {
  // const deleteThisBoard = () => {
  //   if (window.confirm(`Delete ${boardObj.name}?`)) {
  //     deleteBoard(boardObj.firebaseKey).then(() => onUpdate());
  //   }
  // };
  return (
    <>
      <div className="board-card">
        <div className="card-body">
          <h5 className="card-title">${boardObj.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">${boardObj.boardImageUrl}</h6>
          {/* <a href="#" className="card-link">Edit</a>
          <a href="#" className="card-link">Delete</a> */}
        </div>
      </div>
    </>
  );
}

BoardCard.propTypes = {
  boardObj: PropTypes.shape({
    name: PropTypes.string,
    boardImageUrl: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  // onUpdate: PropTypes.func.isRequired,
};
// BoardCard.defaultProps = {
//   boardObj: PropTypes.shape({
//     name: 'Titans',
//     logoUrl: 'https://media1.giphy.com/media/ZtMkorgeyRu5q/200w.gif?cid=82a1493bp86gd572cklybuzdd0y24rt1ea0p0ih3wpxjfggw&rid=200w.gif&ct=g',
//     conference: 'NFL',
//     firebaseKey: '123',
//   }),
// };
export default BoardCard;
