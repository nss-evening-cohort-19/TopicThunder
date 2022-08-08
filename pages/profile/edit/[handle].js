import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUserByHandle } from '../../../api/usersData';
import ProfileForm from '../../../components/forms/ProfileForm';

export default function EditPin() {
  const [editProfile, setEditProfile] = useState({});
  const router = useRouter();

  const { handle } = router.query;

  useEffect(() => {
    getUserByHandle(handle).then(setEditProfile);
  }, [handle]);

  return (<ProfileForm obj={editProfile} />);
}
