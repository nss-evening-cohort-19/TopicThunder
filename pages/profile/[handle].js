/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserByHandle } from '../../api/usersData';
import { getMultipleBoardDetails } from '../../api/boardsData';
import ProfileHead from '../../components/ProfileHead';
import ProfileBody from '../../components/ProfileBody';
// import BoardCardForGrid from '../../components/BoardCardForGrid';
import ProfileBoard from '../../components/ProfileBoard';

export default function ViewProfile() {
  const [userDetails, setUserDetails] = useState({});
  const [boardDetails, setBoardDetails] = useState();
  const router = useRouter();
  const { handle } = router.query;

  useEffect(() => {
    getUserByHandle(handle).then(setUserDetails);
    getMultipleBoardDetails(handle).then(setBoardDetails);
  }, [handle]);

  return (
    <>
      <ProfileHead image={userDetails.image} handle={userDetails.handle} displayName={userDetails.displayName} />
      <ProfileBody handle={userDetails.handle} />
      <div className="profileGrid">
        {boardDetails?.map((board) => (
          <ProfileBoard key={board?.firebaseKey} name={board?.name} image={board?.image} description={board?.description} firebaseKey={board?.firebaseKey} pinCount={board?.pins.length} />
        ))}
      </div>
    </>
  );
}
