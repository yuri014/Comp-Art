import React, { useEffect, useRef } from 'react';
import Lottie, { LottieRef } from 'lottie-react';
import { FaTimes } from 'react-icons/fa';
import { IconButton, Snackbar, ThemeProvider } from '@material-ui/core';

import { ModalProvider } from '@context/modal';
import formTheme from '@styles/themes/FormTheme';
import * as animationData from '../../animations/send-success.json';

interface SendSuccessProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SendSuccess: React.FC<SendSuccessProps> = ({
  setShowModal,
  showModal,
}) => {
  const lottieRef: LottieRef = useRef();

  // Espera a animação do modal
  useEffect(() => {
    setTimeout(() => {
      lottieRef.current.play();
    }, 7000);
  }, [lottieRef]);

  return (
    <ModalProvider
      show={showModal}
      onHide={() => setShowModal(false)}
      title="Publicado!"
    >
      <div className="modal-content">
        <Lottie
          autoPlay={false}
          loop={false}
          animationData={animationData}
          onEnterFrame={() => {
            lottieRef.current.setSpeed(2);
          }}
          onComplete={() => setShowModal(false)}
          rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
          height="auto"
          width="auto"
          lottieRef={lottieRef}
        />
      </div>
    </ModalProvider>
  );
};

interface SendErrorProps {
  showError: string;
  setShowError: React.Dispatch<React.SetStateAction<string>>;
}

export const SendError: React.FC<SendErrorProps> = ({
  setShowError,
  showError,
}) => (
  <ThemeProvider theme={formTheme}>
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={!!showError}
      autoHideDuration={3000}
      onClose={() => setShowError('')}
      message={showError}
      action={
        <IconButton
          size="small"
          aria-label="fechar menu erro"
          onClick={() => setShowError('')}
        >
          <FaTimes />
        </IconButton>
      }
    />
  </ThemeProvider>
);
