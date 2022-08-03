// import { Button } from 'react-bootstrap';
// import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getBoardsByUser } from '../api/boardsData';

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
      <p>The below is a test button I have been using to test data manipulations</p>
      <button variant="danger" type="button" size="lg" className="copy-btn" onClick={() => getBoardsByUser('-N8V0GzBy7sydEXIYRlL').then(console.warn)}>
        Get boards by pin
      </button>
    </div>
  );
}

export default Home;
