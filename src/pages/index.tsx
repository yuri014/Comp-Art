import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import Meta from '@components/SEO/Meta';
import ToggleThemeButton from '@components/ToggleTheme';
import Footer from '@components/Footer';
import Title from '@components/Title';
import CAButton from '@styles/components/button';
import LandingContainer from './_index';

const Modal = dynamic(() => import('../components/Modal'));

const Landing: React.FC = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <LandingContainer>
      <Meta
        title="Comp-Art"
        description="Rede social com o propósito de ajudar a divulgação de artistas."
        keywords="Comp-Art, comp-art, comp art, divulgação, arte, música, ilustrações, artistas"
      />
      <div className="container">
        <div className="toggle-button">
          <ToggleThemeButton />
        </div>
        <main>
          <Title />
          <h2>Venha descobrir novas artes e compartilhar as suas!</h2>
          <section>
            <img
              src="/assets/start-artist-icon.svg"
              alt="Pessoa ao lado de um quadro com notas músicais"
            />
            <div>
              <p>
                Rede social que visa superar os metódos conhecidos de divulgação
                artística.
              </p>
              <CAButton onClick={() => setModalShow(true)}>COMEÇAR</CAButton>
            </div>
          </section>
        </main>
        <Footer />
      </div>
      <Modal
        title="Comece sua jornada!"
        text={
          <p>
            Faça o login ou se cadastre para conhecer e interagir com novos
            artistas ou fãs com gostos em comum com você.
          </p>
        }
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <div className="link-buttons-block">
          <Link href="/login">
            <a>LOGIN</a>
          </Link>
          <Link href="/register">
            <a>CADASTRE-SE</a>
          </Link>
        </div>
      </Modal>
    </LandingContainer>
  );
};

export default Landing;
