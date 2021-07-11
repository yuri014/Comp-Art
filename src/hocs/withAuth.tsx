import React, { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';

import { AuthContext } from '../context/auth';
import Login from '../pages/login';

const withAuth = (Component: NextPage): NextPage => {
  const Auth = props => {
    const [isAuth, setIsAuth] = useState(false);
    const user = useContext(AuthContext);

    useEffect(() => {
      if (user.user) {
        setIsAuth(true);
      }
    }, [user.user]);

    return <>{isAuth ? <Component {...props} /> : <Login />}</>;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
