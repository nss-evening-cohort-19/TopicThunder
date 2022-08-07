/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getPinByFirebaseKey } from '../../api/pinsData';
import PinCard from '../../components/PinCard';

export default function IndPinPage(onUpdate) {
  const router = useRouter();
  const [pinDetails, setPinDetails] = useState({});
  const { firebaseKey } = router.query;

  function getPinDetails(key) {
    getPinByFirebaseKey(key).then(setPinDetails);
  }

  useEffect(() => {
    getPinDetails(firebaseKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseKey]);

  return (
    <div className="pinContainer">
      <PinCard
        pinObj={pinDetails}
        onUpdate={onUpdate}
      />
    </div>
  );
}