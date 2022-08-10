import React, { useState, useEffect } from 'react';
import { getAllPins } from '../api/pinsData';
import { useAuth } from '../utils/context/authContext';
import PinCardForGrid from '../components/PinCardForGrid';
// import { getMultipleBoardDetails, getSingleBoardDetails } from '../api/boardsData';
// import { getSingleBoardDetails } from '../api/boardsData';
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
        {/* <button type="button" size="lg" className="btn signBtn btn-primary btn-large" onClick={() => getSingleBoardDetails('-N92u-p-1_ks1DLFgCam').then(console.warn)}>
          Test Button
        </button> */}
      </div>
    </>
  );
}
