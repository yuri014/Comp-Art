import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

import ToggleThemeButton from '@components/ToggleTheme';
import Footer from '@components/Footer';
import Title from '@components/Title';
import withAuth from '@hocs/withAuth';
import CAButton from '@styles/components/button';
import ConfirmationEmailContainer from './_styles';

const ConfirmationEmail: React.FC = () => (
  <ConfirmationEmailContainer>
    <Head>
      <title>Confirmação de e-mail</title>
    </Head>
    <div className="container">
      <header>
        <ToggleThemeButton />
      </header>
      <main>
        <Title />
        <p>
          Agradecemos pela sua inscrição.
          <br />
          Seu e-mail foi confirmado com sucesso!
        </p>
        <img
          src="/assets/email-confirmation-icon.svg"
          alt="Mão segurando celular com ícone de e-mail"
        />
        <p>Venha explorar esse novo mundo da arte!</p>
        <Link href="/register-profile">
          <CAButton as="a">Criar Perfil</CAButton>
        </Link>
      </main>
      <Footer />
    </div>
  </ConfirmationEmailContainer>
);

export default withAuth(ConfirmationEmail);
