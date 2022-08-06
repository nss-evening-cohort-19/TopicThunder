// import { Button } from 'react-bootstrap';
// import { signOut } from '../utils/auth';
import { getUserByUid } from '../api/usersData';
import { useAuth } from '../utils/context/authContext';
import { useHandle } from '../utils/context/handleContext';

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossOrigin="anonymous" />;

function Home() {
  const { user } = useAuth();
  const { handle } = useHandle();
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
      <button variant="danger" type="button" size="lg" className="copy-btn" onClick={() => getUserByUid('test').then(console.warn(handle))}>
        Console warn handle
      </button>
    </div>
  );
}

export default Home;
