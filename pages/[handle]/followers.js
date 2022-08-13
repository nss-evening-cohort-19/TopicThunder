import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import FollowCard from '../../components/FollowCard';
import { getWhoFollowsUser } from '../../api/followsData';

export default function ShowFollowPage() {
  const [following, setFollowing] = useState();
  const router = useRouter();
  const { handle } = router.query;

  const getFollowData = () => {
    getWhoFollowsUser(handle).then(setFollowing);
  };

  useEffect(() => {
    getFollowData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [following]);

  return (
    <>
      <div className="card cardForm text-center text-dark bg-light mb-3">
        <div className="card-header">
          <h3>{handle}s Followers</h3>
        </div>
        <div className="card-body friendship">
          {following?.map((obj) => (
            <FollowCard key={obj?.handle} image={obj?.image} handle={obj?.handle} name={obj?.displayName} />
          ))}
        </div>
        <div className="card-footer text-muted">
          TOPIC THUNDER &#8482;
        </div>
      </div>
    </>
  );
}
