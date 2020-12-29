import React from 'react';
import Head from 'next/head';
import { FaGamepad } from 'react-icons/fa';

import StartIcon from '../assets/start-artist-icon.svg';
import LandingContainer from '../styles/pages';

const Landing: React.FC = () => (
  <LandingContainer>
    <Head>
      <title>Comp-Art</title>
    </Head>
    <div className="start">
      <div className="start-title">
        Comp-
        <br />
        Art
      </div>
      <div className="start-icon">
        <StartIcon />
      </div>
      <div className="start-text">
        Rede social que visa superar os metódos conhecidos de divulgação
        artística.
      </div>
      <div className="press-start">
        Start
        <FaGamepad />
      </div>
    </div>
  </LandingContainer>
);

export default Landing;
