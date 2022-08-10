import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { getMultipleBoardDetails } from '../../api/boardsData';
import { addPinToBoard } from '../../api/collectionsData';

const initialState = {
  board: '',
};

function SavePinForm({ pinFirebaseKey }) {
  const [boards, setBoards] = useState();
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getMultipleBoardDetails(user.handle).then(setBoards);
  }, [user.handle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPinToBoard(pinFirebaseKey, formInput.board).then(() => {
      router.push(`/board/${formInput.board}`);
    });
  };
  return (
    <div className="card text-center text-dark bg-light mb-3">
      <div className="card-header">
        Pin Form
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <select
              className="form-select mb-3"
              id="floatingSelect"
              aria-label="Board"
              name="boardFirebaseKey"
              onChange={handleChange}
              required
            >
              <option value="">Select a Board</option>
              {
            boards.map((board) => (
              <option
                key={board.firebaseKey}
                value={board.firebaseKey}
                // defaultValue={obj.board === board.firebaseKey}
              >
                {board.name}
              </option>
            ))
          }
            </select>
          </div>
          {/* <div className="input-group mb-3">
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
              <input type="url" id="dest-url" className="form-control" placeholder="Enter a destination url" name="link" value={formInput.link} onChange={handleChange} required />
            </label>
          </div> */}
          <div className="btn-group-vertical">
            <button type="submit" className="btn btn-dark">Save Pin</button>
          </div>
        </form>
      </div>
      <div className="card-footer text-muted">
        TOPIC THUNDER &#8482;
      </div>
    </div>
  );
}

SavePinForm.propTypes = {
  pinFirebaseKey: PropTypes.string,
};

SavePinForm.defaultProps = {
  pinFirebaseKey: '',
};

export default SavePinForm;
