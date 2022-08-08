import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { collectionsGetPinByFirebaseKey } from '../../../api/collectionsData';
import PinForm from '../../../components/forms/PinForm';

export default function EditPin() {
  const [editPins, setEditPins] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    collectionsGetPinByFirebaseKey(firebaseKey).then(setEditPins);
  }, [firebaseKey]);

  return (<PinForm obj={editPins} />);
}
