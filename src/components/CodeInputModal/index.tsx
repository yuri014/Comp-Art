/* eslint-disable arrow-body-style */
import React from 'react';
import ReactCodeInput from 'react-verification-code-input';

import Modal from '@components/Modal';
import CAButton from '@styles/components/button';

interface CodeInputModalProps {
  email: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CodeInputModal: React.FC<CodeInputModalProps> = ({
  email,
  setShowModal,
  showModal,
}) => {
  return (
    <Modal
      title="Quase lá, vai ser jogo rápido!"
      text={
        <>
          <p>
            Já enviamos um código para o seu e-mail <span>{email}</span>
          </p>
          <p>
            Verifique sua caixa de entrada e insira o código no campo abaixo
            para verificar seu e-mail
          </p>
        </>
      }
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <form className="verification-code">
        <ReactCodeInput fields={4} className="input-group" />

        <CAButton type="submit">ENVIAR</CAButton>
      </form>
    </Modal>
  );
};

export default CodeInputModal;
