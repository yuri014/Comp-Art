import React from 'react';
import Head from 'next/head';
import { FaGamepad } from 'react-icons/fa';

const Landing: React.FC = () => (
  <>
    <Head>
      <title>Comp-Art</title>
    </Head>
    <div className="start">
      <div id="start-content">
        <div className="start-title">
          Comp-
          <br />
          Art
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
    </div>
  </>
);

export default Landing;
