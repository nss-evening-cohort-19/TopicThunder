import React, { useState, useEffect } from 'react';
import { getAllPins } from '../api/pinsData';
import { useAuth } from '../utils/context/authContext';
import PinCardForGrid from '../components/PinCardForGrid';

export default function HomePage() {
  const [pins, setPins] = useState([]);

  const { user } = useAuth();

  const getAllThePins = () => {
    getAllPins(user.uid).then((pinsArray) => {
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
        {/* <button type="button" size="lg" className="btn signBtn btn-primary btn-large" onClick={() => addPinToBoard('-N9Kj_rtAvEH6nVyJbxY', '-N93JBVBPQjDjh3A_YVR')}>
          Test Button
        </button> */}
      </div>
    </>
  );
}
