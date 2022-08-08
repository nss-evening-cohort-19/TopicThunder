/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleBoardDetails } from '../../api/boardsData';
import BoardCard from '../../components/BoardCard';

export default function IndBoardPage(onUpdate) {
  const router = useRouter();
  const [boardDetails, setBoardDetails] = useState();
  const { firebaseKey } = router.query;

  function getBoardDetails(key) {
    getSingleBoardDetails(key).then(setBoardDetails);
  }

  useEffect(() => {
    getBoardDetails(firebaseKey);
    console.warn(boardDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseKey]);

  return (
    <div className="boardContainer">
      <BoardCard
        name={boardDetails?.name}
        image={boardDetails?.image}
        onUpdate={onUpdate}
      />
    </div>
  );
}
