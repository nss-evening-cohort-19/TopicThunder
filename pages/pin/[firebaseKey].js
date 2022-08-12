/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAllPins, getSinglePinDetails } from '../../api/pinsData';
import PinCard from '../../components/PinCard';
// import { useAuth } from '../../utils/context/authContext';
import PinCardForGrid from '../../components/PinCardForGrid';

export default function IndPinPage(onUpdate) {
  const router = useRouter();
  const [pinDetails, setPinDetails] = useState();
  const [pins, setPins] = useState([]);
  const { firebaseKey } = router.query;
  // const { user } = useAuth();

  const getAllOfThePinsDetails = () => {
    getAllPins().then((pinsArray) => {
      setPins(pinsArray.filter((pin) => pin.user === pinDetails?.user.handle));
    });
  };

  useEffect(() => {
    getAllOfThePinsDetails();
  }, [pinDetails]);

  function getPinDetails(key) {
    getSinglePinDetails(key).then(setPinDetails);
  }

  useEffect(() => {
    getPinDetails(firebaseKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseKey]);

  return (
    <>
      <PinCard
        pinObj={pinDetails}
        onUpdate={onUpdate}
      />
      <p className="pinUserDetail"> More Pins By Them</p>
      <div className="gridContainer">
        {pins?.map((pin) => (
          <PinCardForGrid pinObj={pin} key={pin.firebaseKey} onUpdate={getAllPins} />
        ))}
      </div>
    </>
  );
}
