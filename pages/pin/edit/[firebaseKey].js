import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSinglePin } from '../../../api/pinsData';
import PinForm from '../../../components/forms/PinForm';

export default function EditPin() {
  const [editPins, setEditPins] = useState({});
  const router = useRouter();

  const { pinFirebaseKey } = router.query;

  useEffect(() => {
    getSinglePin(pinFirebaseKey).then(setEditPins);
  }, [pinFirebaseKey]);

  return (<PinForm pinObj={editPins} />);
}
