import React, { useEffect, useRef } from 'react';
import Lottie, { LottieRef } from 'lottie-react';

import { ModalProvider } from '@context/modal';
import { FaHeart } from 'react-icons/fa';
import * as artistAnimation from '../../../../animations/artist-animation.json';
import * as helpGrow from '../../../../animations/help-grow.json';
import ResponseContainer from './styles';

const successMessages = {
  title: 'Publicado!',
  attribution: 'https://lottiefiles.com/boltbite',
};

const errorMessages = {
  title: 'Bloqueado!',
  attribution: 'https://lottiefiles.com/juliocgb',
};

interface PostResponseProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isBlocked: boolean;
}

const PostResponse: React.FC<PostResponseProps> = ({
  isBlocked,
  setShowModal,
}) => {
  const lottieRef: LottieRef = useRef();
  const messages = isBlocked ? errorMessages : successMessages;

  // Espera a animação do modal
  useEffect(() => {
    setTimeout(() => {
      lottieRef.current.play();
    }, 7000);
  }, [lottieRef]);

  return (
    <ModalProvider onHide={() => setShowModal(false)} title={messages.title}>
      <ResponseContainer className="modal-content">
        <p>
          Compartilhe a arte de outros artistas para poder ajudar eles.
          <span>
            <FaHeart />
          </span>
        </p>
        <p>
          Ao ajudar <span>3 artistas</span>, compartilhando um post deles, você
          pode voltar a fazer seus posts
        </p>

        <Lottie
          autoPlay={false}
          loop={!isBlocked}
          className="animation"
          animationData={isBlocked ? helpGrow : artistAnimation}
          onEnterFrame={() => {
            lottieRef.current.setSpeed(1);
          }}
          rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
          height="auto"
          width="auto"
          lottieRef={lottieRef}
        />
        <div className="attribution">
          <p>Animação feita por:&nbsp;</p>
          <a
            href={messages.attribution}
            target="_blank"
            rel="noopener noreferrer"
          >
            {messages.attribution}
          </a>
        </div>
      </ResponseContainer>
    </ModalProvider>
  );
};

export default PostResponse;
