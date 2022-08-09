/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function BoardCardForGrid({
  firebaseKey, description, name, image,
}) {
  return (
    <>
      <div className="card gridCard">
        <img src={image} className="card-img-top" alt=".." />
        <Link passHref href={`../board/${firebaseKey}`}>
          <div className="hoverContainer">
            <p className="hoverTitle">{name}</p>
            <p className="hoverDescription">{description}</p>
          </div>
        </Link>
      </div>
    </>
  );
}
BoardCardForGrid.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  firebaseKey: PropTypes.string,
  description: PropTypes.string,
};

BoardCardForGrid.defaultProps = {
  name: '',
  image: '',
  firebaseKey: '',
  description: '',
};
