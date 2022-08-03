// import { Button } from 'react-bootstrap';
// import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { addFollowRelation } from '../api/usersData';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.displayName}! </h1>
      <p>Click the button below to logout!</p>
      <button variant="danger" type="button" size="lg" className="copy-btn" onClick={() => addFollowRelation('-N8V1NJy9iNJDisnYJno', '-N8V12atHLWuVd9WQu1K')}>
        Add relationship
      </button>
    </div>
  );
}

export default Home;
