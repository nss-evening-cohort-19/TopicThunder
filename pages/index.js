import React, { useState, useEffect } from 'react';
import { getAllPins } from '../api/pinsData';
import { useAuth } from '../utils/context/authContext';
import PinCardForGrid from '../components/PinCardForGrid';

export default function HomePage() {
  const [pins, setPins] = useState([]);

  const { user } = useAuth();

  const getAllThePins = () => {
    getAllPins(user.uid).then((pinsArray) => {
      console.warn(pinsArray);
      setPins(pinsArray);
    });
  };

  useEffect(() => {
    getAllThePins();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="gridContainer">
        {pins.map((pin) => (
          <PinCardForGrid pinObj={pin} key={pin.firebaseKey} onUpdate={getAllPins} />

        ))}
      </div>
    </>
  );
}
