/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
// import { getUserByUid } from '../api/usersData';

function ProfilePage({ userObj }) {
  const [pageDetails, setPageDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    pageDetails(firebaseKey).then(setPageDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="card profile-page-top">
        <img src={userObj.image} alt="profile pic" className="profile-pic" />
        <h5 className="card-title">{userObj.displayName}</h5>
        <sub className="card-text">{userObj.handle}</sub>
        <div className="card-text follow-link">
          <ul className="list-group list-group-horizontal">
            <li className="list-group-item">Followers: {userObj.followedBy.length}</li>
            <li className="list-group-item">Follows: {userObj.usersFollowed.length}</li>
          </ul>
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
  userObj: PropTypes.shape({
    displayName: PropTypes.string,
    handle: PropTypes.string,
    followedBy: PropTypes.number,
    usersFollowed: PropTypes.number,
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default ProfilePage;
