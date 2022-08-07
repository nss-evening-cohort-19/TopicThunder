import React, { useEffect, useState } from 'react';
import { getAllPins } from '../api/pinsData';
import PinCard from './PinCard';

export default function Pins() {
  const [pins, setPins] = useState([]);

  const getAllThosePins = () => {
    getAllPins().then(setPins);
  };

  useEffect(() => {
    getAllThosePins();
  }, []);

  return (
    <>
      <div>pins</div>
      <div className="d-flex flex-wrap">
        {pins.map((pin) => (
          <PinCard key={pin.firebaseKey} pinObj={pin} src={pin.image} onUpdate={getAllThosePins} />
        ))}
      </div>
    </>
  );
}
