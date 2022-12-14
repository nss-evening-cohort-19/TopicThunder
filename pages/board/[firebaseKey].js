/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import { FaPlus } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import BoardHead from '../../components/BoardHead';
import { useAuth } from '../../utils/context/authContext';
import { getSingleBoardDetails } from '../../api/boardsData';
// import BoardCard from '../../components/BoardCard';
import PinCardForGrid from '../../components/PinCardForGrid';

export default function IndBoardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [boardDetails, setBoardDetails] = useState();
  const { firebaseKey } = router.query;

  const getBoardDetails = () => {
    getSingleBoardDetails(firebaseKey).then((response) => {
      setBoardDetails(response);
    });
  };

  useEffect(() => {
    getBoardDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseKey]);
  return (
    <>
      <BoardHead handle={user?.handle} image={boardDetails?.image} name={boardDetails?.name} pinCount={boardDetails?.pins.length} />
      {/* <div className="boardContainer">
        <BoardCard
          name={boardDetails?.name}
          image={boardDetails?.image}
          time={boardDetails?.time}
          onUpdate={onUpdate}
        />
      </div> */}
      {/* <div className="iconBtns">
        <Link passHref href="/pin/new">
          <button type="button" className="icons btn btn-light">
            <h3><FaPlus /></h3>
          </button>
        </Link>
      </div> */}
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
          <PinCardForGrid key={pin.firebaseKey} pinObj={pin} remPin boardKey={boardDetails?.firebaseKey} onUpdate={getBoardDetails} />
        ))}
      </div>
    </>
  );
}
