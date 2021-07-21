import React from 'react';
import { NextPage } from 'next';

import Header from '@components/Header';
import Home from '@components/Home';
import MobileFooter from '@components/MobileFooter';
import MobileHeader from '@components/MobileHeader';
import { LevelProvider } from '@context/level';
import HomeContainer from 'pages/home/_styles';

const withHome = (Component: NextPage): NextPage => {
  const Auth = props => (
    <HomeContainer>
      <Header getLoggedProfile={props.getLoggedProfile} />
      {props.getLoggedProfile ? (
        <LevelProvider>
          <Home getLoggedProfile={props.getLoggedProfile}>
            <Component {...props} />
          </Home>
          <MobileHeader getLoggedProfile={props.getLoggedProfile} />
        </LevelProvider>
      ) : (
        <Home>
          <Component {...props} />
        </Home>
      )}
      <MobileFooter />
    </HomeContainer>
  );

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withHome;
