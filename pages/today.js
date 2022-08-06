import React, { useState, useEffect } from 'react';
import { getAllPins } from '../api/pinsData';

import PinCard from '../components/PinCard';
// import PropTypes from 'prop-types';

function Today() {
  const [mappedPins, setMappedPins] = useState([]);
  // const [pin, setPin] = useState([]);

  const getTodaysPins = () => {
    getAllPins().then((pinsArray) => {
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
        {mappedPins.map((pin) => (
          <PinCard key={pin.firebaseKey} pinObj={pin} onUpdate={getTodaysPins} />
        ))}
      </div>
    </>
  );
}

export default Today;
