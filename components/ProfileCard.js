/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteUser } from '../api/usersData';

function ProfileCard({ profileObj, onUpdate }) {
  const deleteThisUser = () => {
    if (window.confirm(`Delete ${profileObj.name}?`)) {
      deleteUser(profileObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <>
      <div className="card" style={{ width: '25rem', margin: '10px', borderRadius: '2%' }}>
        <img src={profileObj.image} className="card-img-top" alt="#" />
        <div className="card-body">
          <h5 className="card-title">{profileObj.name}</h5>
          <p className="card-text">{profileObj.displayName}</p>
          <p className="card-text">{profileObj.handle}</p>

        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">An item</li>
          <li className="list-group-item">A second item</li>
          <li className="list-group-item">A third item</li>
        </ul>
        <div className="card-body">
          <Link href={`/profile/edit/${profileObj.firebaseKey}`} passHref>
            <button type="button" className="card-edit">Edit</button>
          </Link><br />
          <button type="button" className="card-delete" onClick={deleteThisUser}>Delete</button>
        </div>
      </div>
    </>
  );
}

ProfileCard.propTypes = {
  profileObj: PropTypes.shape({
    displayName: PropTypes.string,
    image: PropTypes.string,
    handle: PropTypes.string,
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

ProfileCard.defaultProps = {
  profileObj: PropTypes.shape({
    name: 'Some crap',
    displayName: 'johann crap',
    image: 'https://media1.giphy.com/media/ZtMkorgeyRu5q/200w.gif?cid=82a1493bp86gd572cklybuzdd0y24rt1ea0p0ih3wpxjfggw&rid=200w.gif&ct=g',
    handle: 'Someaddress@blabla.com',
    firebaseKey: '123',
  }),
};

export default ProfileCard;
