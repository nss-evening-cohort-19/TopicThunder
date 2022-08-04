import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import { deletePin } from '../api/pinsData';

function PinCard({ pinObj }) {
  console.warn(pinObj);
  // const deleteThisPin = () => {
  //   if (window.confirm(`Delete ${pinObj.name}?`)) {
  //     deletePin(pinObj.firebaseKey).then(() => onUpdate());
  //   }
  // };

  return (
    <>
      <div className="card" style={{ width: '25rem', margin: '10px', borderRadius: '2%' }}>
        <Image src={pinObj.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{pinObj.name}</h5>
          <p className="card-text">{pinObj.boardName}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">An item</li>
          <li className="list-group-item">A second item</li>
          <li className="list-group-item">A third item</li>
        </ul>
        <div className="card-body">
          {/* <a href="#" className="card-link">Card link</a>
          <a href="#" className="card-link">Another link</a> */}
        </div>
      </div>
    </>
  );
}

PinCard.propTypes = {
  pinObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    boardName: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  // onUpdate: PropTypes.func.isRequired,
};

// PinCard.defaultProps = {
//   pinObj: PropTypes.shape({
//     name: 'Some crap',
//     image: 'https://media1.giphy.com/media/ZtMkorgeyRu5q/200w.gif?cid=82a1493bp86gd572cklybuzdd0y24rt1ea0p0ih3wpxjfggw&rid=200w.gif&ct=g',
//     link: 'Someaddress@blabla.com',
//     firebaseKey: '123',
//   }),
// };

export default PinCard;
