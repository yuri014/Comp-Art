import React, { useContext } from 'react';
import { NextPage } from 'next';

import { AuthContext } from '@context/auth';
import NotLoggedInvite from '@components/NotLoggedInvite';

const withPublicRoute = (Component: NextPage): NextPage => {
  const Auth = props => {
    const { user } = useContext(AuthContext);
    if (user) {
      return <Component {...props} />;
    }

    return (
      <>
        <Component {...props} />
        <NotLoggedInvite />
      </>
    );
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withPublicRoute;
