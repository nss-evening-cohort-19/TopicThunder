import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createPin, updatePin } from '../../api/pinsData';

const initialState = {
  displayName: '',
  name: '',
  handle: '',
  image: '',
};

function PinForm({ obj }) {
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
    if (obj.firebaseKey) {
      updatePin(formInput)
        .then(() => router.push(`/pin/${obj.handle}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPin(payload).then(() => {
        router.push('/pins/new');
      });
    }
  };
  return (
    <div className="card text-center text-dark bg-light mb-3">
      <div className="card-header">
        Create Pin
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label mb-3">Title
              <input type="text" id="title" className="form-control" placeholder="Pin Title" aria-label="title" aria-describedby="pin-desc" value={formInput.name} onChange={handleChange} required />
            </label>
          </div>
          <div className="input-group mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label mb-3">Pin Image or Video
              <input type="url" id="image-name" className="form-control" placeholder="Enter an image url" name="image" value={formInput.image} onChange={handleChange} required />
            </label>
          </div>
          <div className="input-group mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label mb-3">Description
              <input type="text" id="description" className="form-control" placeholder="Lorem Ipsum" aria-label="Description" aria-describedby="pin-desc" value={formInput.description} onChange={handleChange} required />
            </label>
          </div>
          <div className="btn-group-vertical">
            <button type="button" className="btn btn-dark">{obj.firebaseKey ? 'Update Pin' : 'Create Pin'}</button>
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
    title: PropTypes.string,
    description: PropTypes.string,
    handle: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
};

PinForm.defaultProps = {
  obj: initialState,
};

export default PinForm;
