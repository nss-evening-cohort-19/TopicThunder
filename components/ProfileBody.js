// import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';
import { BiSliderAlt } from 'react-icons/bi';

function ProfileBody() {
  return (
    <>
      <div className="card border-light profile-body">
        <div className="createSavedBtns">
          <button type="button" className="btn btn-light">
            <h5>Created</h5>
          </button>
          <button type="button" className="btn btn-light">
            <h5>Saved</h5>
          </button>
        </div>
        <div className="iconBtns">
          <button type="button" className="icons btn btn-light">
            <h3><FaPlus /></h3>
          </button>
          <button type="button" className="icons btn btn-light">
            <h3><BiSliderAlt /></h3>
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileBody;
