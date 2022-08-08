/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
// import { getUserByUid } from '../api/usersData';

function ProfilePage({ image, displayName, handle }) {
  return (
    <>
      <div className="card border-light profile">
        <img src={image} alt="profile pic" className="profile-pic" />
        <h3 className="card-title">{displayName}</h3>
        <p className="card-text card-handle-text">@{handle}</p>
        <div className="card-text follow-link">
          {/* <ul className="list-group list-group-horizontal">
            <li className="list-group-item">Followers: {followedBy.length}</li>
            <li className="list-group-item">Follows: {usersFollowed.length}</li>
          </ul> */}
        </div>
        <div className="btnGroup">
          <button type="button" className="btn btn-outline-dark">Share</button>
          <button type="button" className="btn btn-outline-dark">Edit Profile</button>
        </div>
      </div>
    </>
  );
}

ProfilePage.propTypes = {
  displayName: PropTypes.string,
  handle: PropTypes.string,
  image: PropTypes.string,
}.isRequired;

export default ProfilePage;
