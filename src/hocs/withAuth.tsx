import React, { useContext } from 'react';
import { NextPage } from 'next';

import { AuthContext } from '../context/auth';
import Login from '../pages/login';

const withAuth = (Component: NextPage): NextPage => {
  const Auth = props => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Login />;
    }

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
