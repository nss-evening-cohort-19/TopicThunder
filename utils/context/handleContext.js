/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getUserByUid } from '../../api/usersData';
import { useAuth } from './authContext';

const HandleContext = createContext();

HandleContext.displayName = 'HandleContext';

const HandleProvider = (props) => {
  const { user } = useAuth();
  const [handle, setHandle] = useState(null);

  const checkAndSetHandle = () => {
    if (user.uid) {
      getUserByUid(user.uid).then((response) => {
        if (response !== undefined) {
          setHandle(response.handle);
        }
      });
    }
  };

  useEffect(() => {
    checkAndSetHandle();
  }, [user]);

  const value = useMemo(() => ({
    handle,
    checkAndSetHandle,
  }),
  [handle]);
  return <HandleContext.Provider value={value} {...props} />;
};

const HandleConsumer = HandleContext.Consumer;

const useHandle = () => {
  const context = useContext(HandleContext);
  return context;
};

export { HandleProvider, useHandle, HandleConsumer };
