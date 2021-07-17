import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import Custom404Container from '@styles/pages/404';
import NotFoundIcon from '../assets/404.svg';

const Custom404: React.FC = () => (
  <Custom404Container>
    <Head>
      <title>Página não encontrada</title>
    </Head>
    <h1>
      Ops... <br />
      Parece que você deixou cair sua palheta
    </h1>
    <NotFoundIcon />
    <Link href="/home">
      <a>VOLTAR</a>
    </Link>
  </Custom404Container>
);

export default Custom404;
