import React, { useState, useEffect } from 'react';
import { getAllPins } from '../api/pinsData';
import PinCard from '../components/PinCard';
import { useAuth } from '../utils/context/authContext';

export default function HomePage() {
  const [pins, setPins] = useState([]);

  const { user } = useAuth();

  const getAllThePins = () => {
    getAllPins(user.uid).then(setPins);
  };

  useEffect(() => {
    getAllThePins();
  });

  return (
    <div>
      {pins.map((pin) => (
        <PinCard pinObj={pin} key={pin.firebaseKey} onUpdate={getAllPins} />
      ))}
    </div>
  );
}
