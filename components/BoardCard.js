/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import { renderRelativeTime } from '../utils/time';

function BoardCard({ name, image, time }) {
  return (
    <div className="card mb-3" style={{ maxWidth: '540px' }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={image} className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text"><small className="text-muted">Created {renderRelativeTime(time)}</small></p>
          </div>
        </div>
      </div>
    </div>
  );
}

BoardCard.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  time: PropTypes.number,
}.isRequired;

// BoardCard.defaultProps = {
//   name: '',
//   image: '',
//   time: 0,
// };

export default BoardCard;
