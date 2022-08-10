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
      deletePin(pinObj.firebaseKey).then(() => router.push('/'));
    }
  };

  return (
    <div className="pinContainer">
      <div
        // className="card"
        style={{
          width: '690px', margin: '10px', borderRadius: '2%', display: 'flex', alignContent: 'center',
        }}
      >
        <div className="columnOne">
          <img src={pinObj.image} className="card-img-top" alt={pinObj.link} />
        </div>
        <div className="columnTwo">
          <div
            className="card-body"
            style={{
              height: '70px', margin: '50px',
            }}
          >
            <h1 className="card-title">{pinObj.name}</h1>
          </div>
          <div className="pin-content">
            <h3 className="pin-creator">Created by {pinObj.user.handle}</h3>
            <div className="pin-description"> {pinObj.description} </div>
          </div>
          <div>
            <Link passHref href="/">
              <p className="card-text">{pinObj.link}</p>
            </Link>
            <p
              className="pin-date"
            >Created on {renderAbsoluteTime(pinObj.time)} {renderRelativeTime(pinObj.time)}
            </p>
            <div className="card-body">
              <Link href={`/pin/save/${pinObj.firebaseKey}`} passHref>
                <button
                  type="button"
                  className="btn btn-dar"
                  style={{
                    width: '70px', margin: '10px', background: 'hotpink', borderRadius: '20%/50%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                  }}
                >Save
                </button>
              </Link><br />
              <Link href={`/pin/edit/${pinObj.firebaseKey}`} passHref>
                <button
                  type="button"
                  className="btn btn-dar"
                  style={{
                    width: '70px', margin: '10px', background: 'hotpink', borderRadius: '20%/50%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                  }}
                >Edit
                </button>
              </Link><br />
              <button
                style={{
                  display: 'flex', alignSelf: 'flex-end', width: '70px', margin: '10px', background: 'lightgrey', borderRadius: '20%/50%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                }}
                type="button"
                className="btn btn-"
                onClick={deleteThisPin}
              >Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

PinCard.propTypes = {
  pinObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
    description: PropTypes.string,
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
