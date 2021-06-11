import React, { useRef } from 'react';
import Lottie, { LottieRef } from 'lottie-react';
import { FaTimes } from 'react-icons/fa';
import { IconButton, Snackbar, ThemeProvider } from '@material-ui/core';

import Modal from '@components/Modal';
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

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      title="Publicado!"
    >
      <div className="modal-content">
        <Lottie
          loop={false}
          animationData={animationData}
          onEnterFrame={() => {
            lottieRef.current.setSpeed(1.5);
          }}
          onComplete={() => setShowModal(false)}
          rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
          height="auto"
          width="auto"
          lottieRef={lottieRef}
        />
      </div>
    </Modal>
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
