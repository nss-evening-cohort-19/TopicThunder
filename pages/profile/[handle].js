/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { useAuth } from '../../utils/context/authContext';
import { getUserByHandle } from '../../api/usersData';
import { getMultipleBoardDetails } from '../../api/boardsData';
import ProfileHead from '../../components/ProfileHead';
import ProfileBody from '../../components/ProfileBody';
import BoardCardForGrid from '../../components/BoardCardForGrid';

export default function ViewBook() {
  const [userDetails, setUserDetails] = useState({});
  const [boardDetails, setBoardDetails] = useState();
  const router = useRouter();
  const { handle } = router.query;

  useEffect(() => {
    getUserByHandle(handle).then(setUserDetails);
    getMultipleBoardDetails(handle).then(setBoardDetails);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handle]);

  return (
    <>
      <ProfileHead image={userDetails.image} handle={userDetails.handle} displayName={userDetails.displayName} />
      <ProfileBody />
      <div className="boardGridContainer">
        {boardDetails?.map((board) => (
          <BoardCardForGrid key={board?.firebaseKey} name={board?.name} image={board?.image} description={board?.description} firebaseKey={board?.firebaseKey} />
        ))}
      </div>
    </>
  );
}
