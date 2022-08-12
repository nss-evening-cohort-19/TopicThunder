import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { GoSignOut } from 'react-icons/go';
import { useAuth } from '../../utils/context/authContext';
import { createUser, updateUser } from '../../api/usersData';
import { deleteUser } from '../../api/mergedData';
import { signOut } from '../../utils/auth';

const initialState = {
  displayName: '',
  handle: '',
  image: '',
};

function ProfileForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user, checkAndSetHandle } = useAuth();

  useEffect(() => {
    if (obj.handle) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.handle) {
      updateUser(obj.handle, formInput)
        .then(() => router.push(`/profile/${obj.handle}`));
    } else {
      const payloadValue = { ...formInput, uid: user.uid };
      const packagedPayload = {};
      const payloadKey = formInput.handle;
      packagedPayload[payloadKey] = payloadValue;
      createUser(packagedPayload).then(() => {
        checkAndSetHandle(user);
        router.push('/');
      });
    }
  };
  const deleteMyAccount = () => {
    if (window.confirm(`Delete ${obj.handle}'s Entire Account?`)) {
      deleteUser(obj.handle).then(() => {
        router.push('/');
        checkAndSetHandle(user);
      });
    }
  };
  return (
    <div onSubmit={handleSubmit} className="card cardForm text-center text-dark bg-light mb-3">
      <div className="card-header">
        {obj.handle ? 'Update' : 'Create' } Profile
      </div>
      <div className="card-body">
        {user.handle
          ? (
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label mb-3">Profile Image
                  <input
                    type="url"
                    id="image"
                    name="image"
                    className="form-control"
                    placeholder="Enter a URL"
                    aria-label="image"
                    aria-describedby="basic-addon1"
                    value={formInput.image}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="input-group mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label mb-3">Display Name
                  <input
                    type="text"
                    id="displayName"
                    name="displayName"
                    className="form-control"
                    placeholder="Enter your name"
                    aria-label="displayName"
                    aria-describedby="basic-addon1"
                    value={formInput.displayName}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="btn-group-vertical">
                <button type="submit" className="btn btn-dark createBtn" onClick={handleSubmit}>{obj.handle ? 'Update' : 'Create'} Profile</button>
                <button
                  type="button"
                  className="btn redText btn-link"
                  onClick={() => {
                    router.push('/');
                    deleteMyAccount();
                    signOut();
                  }}
                ><sub>Delete My Account</sub>
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label mb-3">Profile Image
                  <input
                    type="url"
                    id="image"
                    name="image"
                    className="form-control"
                    placeholder="Enter a URL"
                    aria-label="image"
                    aria-describedby="basic-addon1"
                    value={formInput.image}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="input-group mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label mb-3">Display Name
                  <input
                    type="text"
                    id="displayName"
                    name="displayName"
                    className="form-control"
                    placeholder="Enter your name"
                    aria-label="displayName"
                    aria-describedby="basic-addon1"
                    value={formInput.displayName}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="input-group mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label mb-3">Username
                  <input
                    type="text"
                    id="handle"
                    name="handle"
                    className="form-control"
                    placeholder="Enter a username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={formInput.handle}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="btn-group-vertical">
                <button type="submit" className="btn btn-dark createBtn" onClick={handleSubmit}>{obj.handle ? 'Update' : 'Create'} Profile</button>
                <button type="button" className="btn btn-link">Continue as guest</button>
                <button
                  type="button"
                  className="btn signOutBtn btn-outline-danger"
                  alt="sign out"
                  onClick={() => {
                    router.push('/');
                    signOut();
                  }}
                ><GoSignOut />
                </button>
              </div>
            </form>
          )}

      </div>
      <div className="card-footer text-muted">
        TOPIC THUNDER &#8482;
      </div>
    </div>
  );
}

ProfileForm.propTypes = {
  obj: PropTypes.shape({
    displayName: PropTypes.string,
    handle: PropTypes.string,
    image: PropTypes.string,
    uid: PropTypes.string,
  }),
};

ProfileForm.defaultProps = {
  obj: initialState,
};

export default ProfileForm;
