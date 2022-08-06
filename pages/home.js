import React, { useState, useEffect } from 'react';
import { getAllPins } from '../api/pinsData';
import { useAuth } from '../utils/context/authContext';
import PinCard from '../components/PinCard';

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
      <div>
        {pins.map((pin) => (
          <PinCard pinObj={pin} key={pin.firebaseKey} onUpdate={getAllPins} />

        ))}
      </div>
    </>
  );
}
