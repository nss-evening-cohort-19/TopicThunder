/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function ProfileBoard({
  firebaseKey, description, name, image, pinCount,
}) {
  return (
    <>
      <Link passHref href={`../board/${firebaseKey}`}>
        <div className="card profileCard">
          <img src={image} className="card-img-top" alt=".." />
          <p className="hoverTitle"><b>{name}</b></p>
          <sup>{pinCount} Pins</sup>
          <div className="hoverContainer">
            <p className="hoverDescription">{description}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
ProfileBoard.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  firebaseKey: PropTypes.string,
  description: PropTypes.string,
  pinCount: PropTypes.number,
};

ProfileBoard.defaultProps = {
  name: '',
  image: '',
  firebaseKey: '',
  description: '',
  pinCount: 0,
};
