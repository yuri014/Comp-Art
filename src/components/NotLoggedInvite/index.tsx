import React from 'react';
import Link from 'next/link';

import NotLoggedInviteContainer from './styles';

const NotLoggedInvite: React.FC = () => (
  <NotLoggedInviteContainer>
    <div className="container">
      <div className="texts">
        <p>Não perca tempo, crie agora mesmo sua conta</p>
        <p>Fique por dentro das novidades do mundo da arte.</p>
      </div>
      <div className="buttons">
        <Link href="/register">
          <a>CRIAR CONTA</a>
        </Link>
        <Link href="/login">
          <a>ENTRAR</a>
        </Link>
      </div>
    </div>
  </NotLoggedInviteContainer>
);

export default NotLoggedInvite;
