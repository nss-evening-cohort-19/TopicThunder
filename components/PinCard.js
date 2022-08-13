/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { deletePin } from '../api/mergedData';
import { renderAbsoluteTime, renderRelativeTime } from '../utils/time';

function PinCard({ pinObj }) {
  const { user } = useAuth();
  const router = useRouter();
  const deleteThisPin = () => {
    if (window.confirm(`Delete ${pinObj.name}?`)) {
      deletePin(pinObj.firebaseKey).then(() => router.push('/'));
    }
  };
  console.warn(pinObj);
  return (
    <div className="pinContainer">
      <div
        // className="card"
        style={{
          width: '700px', margin: '10px', borderRadius: '2%', display: 'flex', alignContent: 'center',
        }}
      >
        <div className="columnOne">
          <img src={pinObj.image} className="card-img-top" alt={pinObj.link} />
        </div>
        <div className="columnTwo">
          <div
            className="card-body"
            style={{
              height: '70px', margin: '.5rem',
            }}
          >
            <h1
              className="card-title"
              style={{
                margin: 0,
              }}
            >{pinObj.name}
            </h1>
          </div>
          <div className="pin-content">
            {/* <Link passHref href={`/profile/${pinObj.user.handle}`}>
              <h5 className="pin-creator">Created by <b><u><em>{pinObj.user.handle}</em></u></b></h5>
            </Link> */}
            <div
              className="pin-description"
              style={{
                margin: '.5rem',
              }}
            > {pinObj.description}
            </div>
          </div>
          <div>
            <Link passHref href={pinObj.link}>
              <p className="card-text"><em>{pinObj.link}</em></p>
            </Link>
            <sup
              className="pin-date"
            >Created on {renderAbsoluteTime(pinObj.time)} {renderRelativeTime(pinObj.time)}
            </sup>
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
              { pinObj.user.handle === user.handle
                ? (
                  <>
                    <Link href={`/pin/edit/${pinObj.firebaseKey}`} passHref>
                      <button
                        type="button"
                        className="btn btn-dar"
                        style={{
                          width: '70px', margin: '10px', background: 'hotpink', borderRadius: '20%/50%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                        }}
                      >Edit
                      </button>
                    </Link>
                    <br />
                    <button
                      style={{
                        display: 'flex', alignSelf: 'flex-end', width: '70px', margin: '10px', background: 'lightgrey', borderRadius: '20%/50%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                      }}
                      type="button"
                      className="btn btn-"
                      onClick={deleteThisPin}
                    >Delete
                    </button>
                  </>
                )
                : ''}
            </div>
          </div>
          <div className="card-footer pinDeets">
            <Link passHref href={`/profile/${pinObj.user.handle}`}>
              <img className="pinPhoto" src={pinObj.user.image} alt={pinObj.link} />
            </Link>
            <b> {pinObj.user.handle} </b>
            <em> saved to </em>
            <Link passHref href={`/pin/${pinObj.firebaseKey}`}>
              <p><b> {pinObj?.name} </b></p>
            </Link>
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
