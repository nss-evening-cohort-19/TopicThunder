import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createUser, updateUser } from '../../api/usersData';

const initialState = {
  displayName: '',
  handle: '',
  image: '',
};

function ProfileForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

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
        router.push('/home');
      });
    }
  };
  return (
    <div className="card cardForm text-center text-dark bg-light mb-3">
      <div className="card-header">
        Create Profile
      </div>
      <div className="card-body">
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
            <button type="button" className="btn btn-dark" onClick={handleSubmit}>{obj.handle ? 'Update' : 'Create'}</button>
            <button type="button" className="btn btn-link">Continue as guest</button>
          </div>
        </form>
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
