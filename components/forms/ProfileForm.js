import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createUser, updateUser } from '../../api/usersData';

const initialState = {
  displayName: '',
  name: '',
  handle: '',
  image: '',
};

function ProfileForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
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
      updateUser(formInput)
        .then(() => router.push(`/profile/${obj.handle}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createUser(payload).then(() => {
        router.push('/profiles');
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
              <input type="url" id="image-url" className="form-control" placeholder="url" name="image" value={formInput.image} onChange={handleChange} required />
            </label>
          </div>
          <div className="input-group mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label mb-3">Display Name
              <input type="text" id="display-name" className="form-control" placeholder="JJ" name="name" value={formInput.name} onChange={handleChange} required />
            </label>
          </div>
          <div className="input-group mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label mb-3">Username
              <input type="text" id="handle" className="form-control" placeholder="JohnJacob" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} required />
            </label>
          </div>
          <div className="btn-group-vertical">
            <button type="button" className="btn btn-dark">{obj.firebaseKey ? 'Update' : 'Create'} Profile</button>
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
    name: PropTypes.string,
    handle: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
};

ProfileForm.defaultProps = {
  obj: initialState,
};

export default ProfileForm;
