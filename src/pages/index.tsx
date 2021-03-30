import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import PressStartButton from '../components/PressStartButton';
import Meta from '../components/SEO/Meta';
import LandingContainer from './_index';
import ToggleThemeButton from '../components/ToggleTheme';
import Footer from '../components/Footer';

const Modal = dynamic(() => import('../components/Modal'));

const Landing: React.FC = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Meta
        title="Comp-Art"
        description="Rede social com o propósito de ajudar a divulgação de artistas."
        keywords="Comp-Art, comp-art, comp art, divulgação, arte, música, ilustrações, artistas"
      />
      <LandingContainer>
        <div className="container">
          <div className="toggle-button">
            <ToggleThemeButton />
          </div>
          <main>
            <h1>CompArt</h1>
            <h2>Venha descobrir novas artes e compartilhar as suas!</h2>
            <section>
              <img
                src="/assets/start-artist-icon.svg"
                alt="Pessoa ao lado de um quadro com notas músicais"
              />
              <div>
                <p>
                  Rede social que visa superar os metódos conhecidos de
                  divulgação artística.
                </p>
                <PressStartButton changeState={() => setModalShow(true)}>
                  Start
                </PressStartButton>
              </div>
            </section>
          </main>
          <Footer />
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
