import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import StartIcon from '../assets/start-artist-icon.svg';
import LandingContainer from '../styles/pages';
import PressStartButton from '../components/PressStartButton';
import Meta from '../components/SEO/Meta';

const Modal = dynamic(() => import('../components/Modal'));

const Landing: React.FC = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <LandingContainer>
        <Meta
          title="Comp-Art"
          description="Rede social com o propósito de ajudar a divulgação de artistas."
          keywords="Comp-Art, comp-art, comp art, divulgação, arte, música, ilustrações, artistas"
        />

        <div className="start">
          <div>
            <h1>
              Comp-
              <br />
              Art
            </h1>
          </div>
          <div className="start-icon">
            <StartIcon />
          </div>
        </div>

        <div className="start-button">
          <h2>
            Rede social que visa superar os metódos conhecidos de divulgação
            artística.
          </h2>
          <PressStartButton changeState={() => setModalShow(true)}>
            Start
          </PressStartButton>
        </div>
      </LandingContainer>
      <Modal
        title="Comece sua jornada!"
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <div className="modal-body">
          <p>
            Faça o login ou se cadastre para conhecer e interagir com novos
            artistas ou fãs com gostos em comum com você.
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
    </>
  );
};

export default Landing;
