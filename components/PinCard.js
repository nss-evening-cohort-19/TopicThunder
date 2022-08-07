/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deletePin } from '../api/mergedData';
import { renderAbsoluteTime, renderRelativeTime } from '../utils/time';

function PinCard({ pinObj }) {
  const router = useRouter();
  const deleteThisPin = () => {
    if (window.confirm(`Delete ${pinObj.name}?`)) {
      deletePin(pinObj.firebaseKey).then(() => router.push('/home'));
    }
  };

  return (
    <>
      <div className="card" style={{ width: '25rem', margin: '10px', borderRadius: '2%' }}>
        <img src={pinObj.image} className="card-img-top" alt={pinObj.link} />
        <div className="card-body">
          <h5 className="card-title">{pinObj.name}</h5>
          <Link passHref href="/">
            <p className="card-text">{pinObj.link}</p>
          </Link>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Created by {pinObj.user}</li>
          <li className="list-group-item">Created on {renderAbsoluteTime(pinObj.time)}</li>
          <li className="list-group-item">Created {renderRelativeTime(pinObj.time)}</li>
        </ul>
        <div className="card-body">
          <Link href={`/pin/edit/${pinObj.firebaseKey}`} passHref>
            <button type="button" className="card-edit">Edit</button>
          </Link><br />
          <button type="button" className="card-delete" onClick={deleteThisPin}>Delete</button>
        </div>
      </div>
    </>
  );
}

PinCard.propTypes = {
  pinObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
    user: PropTypes.string,
    time: PropTypes.number,
    firebaseKey: PropTypes.string,
  }),
};

PinCard.defaultProps = {
  pinObj: PropTypes.shape({
    name: 'Some crap',
    image: 'https://media1.giphy.com/media/ZtMkorgeyRu5q/200w.gif?cid=82a1493bp86gd572cklybuzdd0y24rt1ea0p0ih3wpxjfggw&rid=200w.gif&ct=g',
    link: 'Someaddress@blabla.com',
    firebaseKey: '123',
  }),
};

export default PinCard;
