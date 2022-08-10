/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FaEllipsisH, FaPlus } from 'react-icons/fa';
import { BiSliderAlt } from 'react-icons/bi';
// import { useAuth } from '../utils/context/authContext';

function BoardHead({
  image, name, pinCount, handle,
}) {
  return (
    <>
      <div className="card border-light profile board-head">
        <div className="card-top">
          <h1 className="card-title">{name}</h1>
          <button type="button" className="icons btn btn-light">
            <h3><FaEllipsisH /></h3>
          </button>
        </div>
        <div className="card-mid">
          <Link passHref href={`/profile/${handle}`} className="btn btn-light">
            <img src={image} alt="board pic" className="board-pic" />
          </Link>
          <Link passHref href="/board/new" className="btn btn-light">
            <button type="button" className="icons btn btn-light">
              <h3><FaPlus /></h3>
            </button>
          </Link>
        </div>
        <div className="card-bottom">
          <h5>{pinCount} Pins</h5>
          <button type="button" className="icons btn btn-light">
            <h3><BiSliderAlt /></h3>
          </button>
        </div>
      </div>
    </>
  );
}

BoardHead.propTypes = {
  displayName: PropTypes.string,
  handle: PropTypes.string,
  image: PropTypes.string,
}.isRequired;

export default BoardHead;
