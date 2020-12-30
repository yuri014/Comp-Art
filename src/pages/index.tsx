import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaGamepad } from 'react-icons/fa';

import StartIcon from '../assets/start-artist-icon.svg';
import LandingContainer from '../styles/pages';
import Modal from '../components/Modal';

const Landing: React.FC = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
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
        <div
          role="button"
          tabIndex={0}
          onClick={() => setModalShow(true)}
          onKeyDown={() => setModalShow(true)}
          className="press-start"
        >
          Start
          <FaGamepad />
        </div>
      </div>
      <Modal
        title="A princesa está em outro castelo!"
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <div className="modal-body">
          <p>
            Para se aventurar em uma jornada de muita beleza e emoção, se
            cadastre! Se sua jornada já começou, faça o seu login!
          </p>
        </div>
        <div className="link-buttons-block">
          <Link href="/login">
            <a>Login</a>
          </Link>
          <Link href="/register">
            <a>Cadastre-se</a>
          </Link>
        </div>
      </Modal>
    </LandingContainer>
  );
};

export default Landing;
