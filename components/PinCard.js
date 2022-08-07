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
          <li className="list-group-item">Created by {pinObj.user.handle}</li>
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
    boards: PropTypes.arrayOf(PropTypes.shape({
      description: PropTypes.string,
      firebaseKey: PropTypes.string,
      name: PropTypes.string,
      time: PropTypes.number,
      user: PropTypes.string,
    })),
    user: PropTypes.shape({
      displayName: PropTypes.string,
      handle: PropTypes.string,
      image: PropTypes.string,
      uid: PropTypes.string,
    }),
    time: PropTypes.number,
    firebaseKey: PropTypes.string,
  }),
};

PinCard.defaultProps = {
  pinObj: {
    name: '',
    image: '',
    firebaseKey: '',
    link: '',
    boards: [{ default: 'default' }],
    user: {
      displayName: '',
      handle: '',
      image: '',
      uid: '',
    },
  },
};

export default PinCard;
