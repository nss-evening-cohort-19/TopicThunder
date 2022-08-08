/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';

// import Link from 'next/link';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import { deleteBoard } from '../api/boardsData';

function BoardCard({ name, image }) {
  // const deleteThisBoard = () => {
  //   if (window.confirm(`Delete ${boardObj.name}?`)) {
  //     deleteBoard(boardObj.firebaseKey).then(() => onUpdate());
  //   }
  // };
  return (
    <div className="card mb-3" style={{ maxWidth: '540px' }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={image} className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
    </div>
  );
}

BoardCard.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
};

BoardCard.defaultProps = {
  name: '',
  image: '',
};

export default BoardCard;
