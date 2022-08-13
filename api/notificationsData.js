import axios from 'axios';
import { clientCredentials } from '../utils/client';
import { getUserByHandle } from './usersData';

const dbUrl = clientCredentials.databaseURL;

const createNotification = (recipient, subject, verb, link) => new Promise((resolve, reject) => {
  const notificationObj = {
    subject,
    verb,
    link,
    seen: false,
    time: new Date().getTime(),
  };
  getUserByHandle(subject).then((userResponse) => {
    notificationObj.subject = userResponse;
    notificationObj.subject.notifications = [];
    axios.post(`${dbUrl}/users/${recipient}/notifications.json`, notificationObj)
      .then((response) => {
        const payload = { firebaseKey: response.data.name };
        axios.patch(`${dbUrl}/users/${recipient}/notifications/${response.data.name}.json`, payload)
          .then(resolve);
      }).catch(reject);
  });
});

const patchNotificationSeen = (user, firebaseKey) => new Promise((resolve, reject) => {
  const patchObj = { seen: true };
  axios.patch(`${dbUrl}/users/${user}/notifications/${firebaseKey}.json`, patchObj)
    .then((response) => resolve(response)).catch(reject);
});

const getNotificationsAndMark = (user) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users/${user}/notifications.json`)
    .then((response) => {
      if (response.data) {
        const sortedArray = Object.values(response.data).sort((a, b) => b.time - a.time);
        resolve(sortedArray);
        const patchSeen = Object.values(response.data).map((notification) => patchNotificationSeen(user, notification.firebaseKey));
        Promise.all(patchSeen);
      } else {
        resolve([]);
      }
    }).catch(reject);
});

const getNotifications = (user) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users/${user}/notifications.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch(reject);
});

export {
  createNotification,
  getNotificationsAndMark,
  getNotifications,
};
