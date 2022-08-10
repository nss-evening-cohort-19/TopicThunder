/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { MdOutlineFileUpload } from 'react-icons/md';
import { FaEllipsisH } from 'react-icons/fa';
import { useAuth } from '../utils/context/authContext';
import {
  getWhoUserFollows, getWhoFollowsUser, addFollow, removeFollow,
} from '../api/followsData';

function ProfilePage({ image, displayName, handle }) {
  const { user } = useAuth();
  const [followDetails, setFollowDetails] = useState(null);
  const [followerDetails, setFollowerDetails] = useState(null);
  const [followed, setFollowed] = useState(null);
  const gatherFollowDataOfProfile = () => {
    getWhoUserFollows(handle).then((userArray) => {
      setFollowDetails(userArray.slice());
    });
    getWhoFollowsUser(handle).then((userArray) => {
      setFollowerDetails(userArray.slice());
    });
  };

  const checkIfFollowedByYou = () => {
    const match = followerDetails?.filter((obj) => obj.handle === user.handle);
    if (match?.length > 0) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  };

  useEffect(() => {
    gatherFollowDataOfProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handle]);

  useEffect(() => {
    checkIfFollowedByYou();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followerDetails]);

  return (
    <>
      <div className="card border-light profile">
        <img src={image} alt="profile pic" className="profile-pic" />
        <h3 className="card-title">{displayName}</h3>
        <p className="card-text card-handle-text">@{handle}</p>
        <div className="card-text follow-link">
          <ul className="followList">
            <li className="list-group-item"><b>Followers: {followerDetails?.length}</b></li>
            <li className="list-group-item"><b>Following: {followDetails?.length}</b></li>
          </ul>
        </div>
        <div className="btnGroup">
          {user.handle === handle
            ? (
              <>
                <button type="button" className="btn shareBtn btn-outline-dark">Share</button>
                <Link passHref href={`/profile/edit/${handle}`}>
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
                {followed
                  ? (
                    <>
                      <button
                        type="button"
                        id={handle}
                        className="btn editBtn btn-dark"
                        onClick={() => {
                          removeFollow(user.handle, handle).then(() => gatherFollowDataOfProfile());
                        }}
                      >Unfollow
                      </button>
                    </>
                  )
                  : (
                    <button
                      type="button"
                      onClick={() => {
                        addFollow(user.handle, handle).then(() => gatherFollowDataOfProfile());
                      }}
                      id={handle}
                      className="btn editBtn btn-danger"
                    >Follow
                    </button>
                  )}
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
