import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import FollowCard from '../../components/FollowCard';
import { getUserByHandle } from '../../api/usersData';

export default function ShowFollowPage() {
  const [userDetails, setUserDetails] = useState({});

  const router = useRouter();
  const { handle } = router.query;

  useEffect(() => {
    getUserByHandle(handle).then(setUserDetails);
  }, [handle]);

  return (
    <FollowCard handle={userDetails.handle} />
  );
}
