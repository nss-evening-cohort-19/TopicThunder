import React, { useState, useEffect } from 'react';
import { getPinByFirebaseKey } from '../api/pinsData';
import PinCard from '../components/PinCard';
// import PropTypes from 'prop-types';

function Today() {
  const [pin, setPin] = useState([]);

  useEffect(() => {
    getPinByFirebaseKey('-N8V45RB3KJpf4kMqBnw').then(setPin);
  }, []);
  return (
    <>
      <div>Today</div>
      <PinCard pinObj={pin} />
    </>
  );
}

export default Today;
