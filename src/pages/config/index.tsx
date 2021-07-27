import React, { useContext } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  FaBookOpen,
  FaExchangeAlt,
  FaLock,
  FaSignOutAlt,
} from 'react-icons/fa';

import MobileFooter from '@components/MobileFooter';
import { AuthContext } from '@context/auth';
import { initializeApollo } from '@graphql/apollo/config';
import getLoggedUserWithNoAuth from '@ssr-functions/getLoggedUserWithNoAuth';
import { ILoggedProfile } from '@interfaces/Profile';
import MobileHeader from '@components/MobileHeader';
import ConfigContainer from './style';

const ConfigurationPage: React.FC<ILoggedProfile> = ({ getLoggedProfile }) => {
  const auth = useContext(AuthContext);
  const { push } = useRouter();

  return (
    <ConfigContainer>
      {getLoggedProfile && (
        <header>
          <MobileHeader getLoggedProfile={getLoggedProfile} />
        </header>
      )}
      <main>
        <Link href="/changelog">
          <a className="config-item">
            <FaExchangeAlt />
            Changelog
          </a>
        </Link>
        <Link href="/terms">
          <a className="config-item">
            <FaBookOpen />
            Termos
          </a>
        </Link>
        <Link href="/privacy-policy">
          <a className="config-item">
            <FaLock />
            Politica de Privacidade
          </a>
        </Link>
        <button
          onClick={() => {
            auth.logout();
            push('/login');
          }}
          className="config-item"
          type="button"
        >
          <FaSignOutAlt className="danger" />
          Sair
        </button>
      </main>
      <MobileFooter />
    </ConfigContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { jwtToken } = req.cookies;

  const client = initializeApollo(null, jwtToken);

  const getLoggedProfile = await getLoggedUserWithNoAuth(jwtToken, client);

  return {
    props: {
      getLoggedProfile,
    },
  };
};

export default ConfigurationPage;
