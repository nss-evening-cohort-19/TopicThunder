// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import { BiSliderAlt } from 'react-icons/bi';
import { useAuth } from '../utils/context/authContext';

function ProfileBody({ handle }) {
  const user = useAuth();
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
          {user.handle !== handle
            ? (
              <>
                <button type="button" className="icons btn btn-light">
                  <h3><BiSliderAlt /></h3>
                </button>
                <Link passHref href="/board/new" className="icons btn btn-light">
                  <button type="button" className="icons btn btn-light">
                    <h3><FaPlus /></h3>
                  </button>
                </Link>
              </>
            )
            : ''}
        </div>
      </div>
    </>
  );
}

ProfileBody.propTypes = {
  handle: PropTypes.string,
}.isRequired;

export default ProfileBody;
