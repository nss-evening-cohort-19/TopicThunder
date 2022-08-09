/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaPlus } from 'react-icons/fa';
import { useAuth } from '../../utils/context/authContext';
import { getSingleBoardDetails } from '../../api/boardsData';
import BoardCard from '../../components/BoardCard';
import PinCardForGrid from '../../components/PinCardForGrid';

export default function IndBoardPage(onUpdate) {
  const { user } = useAuth();
  const router = useRouter();
  const [boardDetails, setBoardDetails] = useState();
  const { firebaseKey } = router.query;
  function getBoardDetails(key) {
    getSingleBoardDetails(key).then((response) => {
      setBoardDetails(response);
    });
  }

  useEffect(() => {
    getBoardDetails(firebaseKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseKey]);

  return (
    <>
      <div className="boardContainer">
        <BoardCard
          name={boardDetails?.name}
          image={boardDetails?.image}
          time={boardDetails?.time}
          onUpdate={onUpdate}
        />
      </div>
      {boardDetails?.user.handle === user.handle
        ? (
          <div className="iconBtns">
            <Link passHref href={`/pin/createAndAddToBoard/${boardDetails?.firebaseKey}`}>
              <button type="button" className="icons btn btn-light">
                <h3><FaPlus /></h3>
              </button>
            </Link>
          </div>
        )
        : '' }
      <div className="pin-map">
        {boardDetails?.pins.map((pin) => (
          <PinCardForGrid key={pin.firebaseKey} pinObj={pin} />
        ))}
      </div>
    </>
  );
}
