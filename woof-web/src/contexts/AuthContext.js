import React, { useCallback, useMemo, useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";

const AuthContext = React.createContext();

export function AuthProvider(props) {
  // change this when auth is actually set up
  const [user, _setUser] = useState();
  const [pending, _setPending] = useState(true);
  const setUser = useCallback(_setUser, []);
  const setPending = useCallback(_setPending, true);

  const getMemoizedSetters = useMemo(() => {
    return {
      setUser,
    };
  }, []);

  firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
    setPending(false);
  });

  if (pending) {
    return <>Loading...</>;
  }

  // Merge memoized setters with non-memoable vars
  const getApi = () => {
    return {
      user,
      ...getMemoizedSetters,
    };
  };

  return (
    <AuthContext.Provider value={getApi()}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
