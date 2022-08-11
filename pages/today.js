import React, { useState, useEffect } from 'react';
import { getAllPins } from '../api/pinsData';
// import { useAuth } from '../utils/context/authContext';
import PinCardForGrid from '../components/PinCardForGrid';

export default function Today() {
  const [pins, setPins] = useState([]);
  // const { user } = useAuth();

  const getAllThePins = () => {
    let sortedArray = [];
    let filteredArray = [];
    const now = new Date().getTime();
    getAllPins().then((pinsArray) => {
      sortedArray = pinsArray;
      sortedArray.sort((a, b) => b.time - a.time);
      filteredArray = sortedArray.filter((obj) => now - obj.time < 86400000);
      setPins(filteredArray);
    });
  };
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  useEffect(() => {
    getAllThePins();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3 className="text-center">{date}</h3>
      <h1 className="text-center"> Inspiration For Today</h1><hr />
      <div className="gridContainer">
        {pins?.map((pin) => (
          <PinCardForGrid pinObj={pin} key={pin.firebaseKey} onUpdate={getAllPins} />
        ))}
      </div>
    </>
  );
}
