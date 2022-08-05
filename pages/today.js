import React, { useState, useEffect } from 'react';
import { getPinByFirebaseKey } from '../api/pinsData';
import PinCard from '../components/PinCard';
// import PropTypes from 'prop-types';

function Today() {
  const [mappedPins, setMappedPins] = useState([]);
  // const [pin, setPin] = useState([]);

  const getTodaysPins = () => {
    getPinByFirebaseKey().then((pinsArray) => {
      console.warn(pinsArray);
      // setPin(pinsArray);
      setMappedPins(pinsArray);
    });
  };

  useEffect(() => {
    getTodaysPins();
  }, []);

  return (
    <>
      <div>Today</div>
      <div className="pins-map">
        {mappedPins.map((pins) => (
          <PinCard key={pins.firebaseKey} pinObj={pins} onUpdate={getTodaysPins} />
        ))}
      </div>
    </>
  );
}

export default Today;
