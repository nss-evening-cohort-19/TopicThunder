import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createPin, updatePin } from '../../api/pinsData';

const initialState = {
  name: '',
  image: '',
  description: '',
};

function PinForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePin(formInput)
        .then(() => router.push(`/pin/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, user: user.handle, time: new Date().getTime() };
      createPin(payload).then(() => {
        router.push('/home');
      });
    }
  };
  return (
    <div className="card text-center text-dark bg-light mb-3">
      <div className="card-header">
        Pin Form
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label mb-3">Pin Title
              <input type="text" id="pin-name" className="form-control" placeholder="Title of Pin" name="name" value={formInput.name} onChange={handleChange} required />
            </label>
          </div>
          <div className="input-group mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label mb-3">Pin Image or Video
              <input type="url" id="image-url" className="form-control" placeholder="Enter an image url" name="image" value={formInput.image} onChange={handleChange} required />
            </label>
          </div>
          <div className="input-group mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label mb-3">Pin Description
              <input type="text" id="pin-desc" className="form-control" placeholder="Describe this pin" name="description" value={formInput.description} onChange={handleChange} required />
            </label>
          </div>
          <div className="input-group mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label mb-3">Destination link
              <input type="url" id="dest-url" className="form-control" placeholder="Enter an destination url" name="link" value={formInput.link} onChange={handleChange} required />
            </label>
          </div>
          <div className="btn-group-vertical">
            <button type="submit" className="btn btn-dark">{obj.firebaseKey ? 'Update' : 'Create'} Pin</button>
          </div>
        </form>
      </div>
      <div className="card-footer text-muted">
        TOPIC THUNDER &#8482;
      </div>
    </div>
  );
}

PinForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

PinForm.defaultProps = {
  obj: initialState,
};

export default PinForm;
