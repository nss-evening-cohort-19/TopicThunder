import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  getWhoFollowsUser, addFollow, removeFollow,
} from '../api/followsData';
import { useAuth } from '../utils/context/authContext';

export default function FollowCard({
  handle, name, image,
}) {
  const { user } = useAuth();
  const [followed, setFollowed] = useState(null);
  const [followerDetails, setFollowerDetails] = useState(null);

  const gatherFollowDataOfProfile = () => {
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
    checkIfFollowedByYou();
  }, [followerDetails]);

  useEffect(() => {
    gatherFollowDataOfProfile();
  }, [handle]);
  return (
    <>
      <div className="friendCard">
        <Link passHref href={`../profile/${handle}`}>
          <img src={image} className="friendImg" alt="..." />
        </Link>
        <div className="friendDetails">
          <h5>{name}</h5>
        </div>
        {user.handle !== handle
          ? (

            <div className="friendBtn">
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
            </div>
          )
          : ''}
      </div>
    </>
  );
}

FollowCard.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  handle: PropTypes.string,
};

FollowCard.defaultProps = {
  name: '',
  image: '',
  handle: '',
};
