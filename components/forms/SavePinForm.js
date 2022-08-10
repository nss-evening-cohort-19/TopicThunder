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
    console.warn(e.target);
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.warn(pinFirebaseKey, ' ', formInput.board);
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
              className="boardSelector"
              aria-label="Board"
              name="board"
              onChange={handleChange}
              required
            >
              <option value="">Save to which board?</option>
              {
            boards?.map((board) => (
              <option
                key={board.firebaseKey}
                value={board.firebaseKey}
              >
                {board.name}
              </option>
            ))
          }
            </select>
          </div>
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
