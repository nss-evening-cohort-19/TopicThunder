/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { MdOutlineFileUpload } from 'react-icons/md';
import { FaEllipsisH } from 'react-icons/fa';
import { useAuth } from '../utils/context/authContext';
// import { getUserByUid } from '../api/usersData';

function ProfilePage({ image, displayName, handle }) {
  const { user } = useAuth();

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
          {user.handle === handle
            ? (
              <>
                <button type="button" className="btn shareBtn btn-outline-dark">Share</button>
                <Link passHref href="/profile/edit/MrPenn">
                  <button type="button" className="btn editBtn btn-outline-dark">Edit Profile</button>
                </Link>
              </>
            )
            : ''}
          {user.handle !== handle
            ? (
              <>
                <button type="button" className="icons btn btn-light">
                  <h2><MdOutlineFileUpload /></h2>
                </button>
                <button type="button" className="btn shareBtn btn-outline-dark">Message</button>
                <button type="button" className="btn editBtn btn-danger">Follow</button>
                <button type="button" className="icons btn btn-light">
                  <h3><FaEllipsisH /></h3>
                </button>

              </>
            )
            : ''}
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
