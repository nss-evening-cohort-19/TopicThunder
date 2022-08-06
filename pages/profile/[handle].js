/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserByHandle } from '../../api/usersData';
import ProfileHead from '../../components/ProfileHead';

export default function ViewBook() {
  const [userDetails, setUserDetails] = useState({});
  const router = useRouter();

  const { handle } = router.query;

  useEffect(() => {
    getUserByHandle(handle).then(setUserDetails);
  }, [handle]);

  return (
    <ProfileHead image={userDetails.image} handle={userDetails.handle} displayName={userDetails.displayName} />
  );
}
