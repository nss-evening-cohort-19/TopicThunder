import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getNotificationsAndMark } from '../api/notificationsData';
import NotificationCard from '../components/NotificationCard';

export default function Notifications() {
  const [notifications, setNotifications] = useState();
  const { user } = useAuth();

  useEffect(() => {
    getNotificationsAndMark(user.handle).then((response) => {
      setNotifications(response);
    });
  }, [user]);

  return (
    <>
      <div className="card cardForm text-center text-dark bg-light mb-3">
        <div className="card-header">
          <h3>Your Notifications</h3>
        </div>
        <div className="card-body friendship">
          {notifications?.map((notification) => (
            <NotificationCard key={notification?.firebaseKey} image={notification?.subject.image} name={notification?.subject.displayName} handle={notification?.subject.handle} verb={notification?.verb} seen={notification?.seen} link={notification?.link} />
          ))}
        </div>
        <div className="card-footer text-muted">
          TOPIC THUNDER &#8482;
        </div>
      </div>
    </>
  );
}

// handle name image verb seen link
