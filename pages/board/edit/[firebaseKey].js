import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { collectionsGetBoardByFirebaseKey } from '../../../api/collectionsData';
import BoardForm from '../../../components/forms/BoardForm';

export default function EditBoard() {
  const [editBoards, setEditBoards] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    collectionsGetBoardByFirebaseKey(firebaseKey).then(setEditBoards);
  }, [firebaseKey]);

  return (<BoardForm image={editBoards.image} name={editBoards.name} />);
}
