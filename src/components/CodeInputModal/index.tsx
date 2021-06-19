import React, { useContext, useState } from 'react';
import ReactCodeInput from 'react-verification-code-input';
import { useMutation } from '@apollo/client';

import Modal from '@components/Modal';
import CAButton from '@styles/components/button';
import { CONFIRMATION_EMAIL } from '@graphql/mutations/user';
import { AuthContext } from '@context/auth';
import CodeInputModalContainer from './styles';

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
  const [code, setCode] = useState('');
  const authContext = useContext(AuthContext);
  const [sendCode] = useMutation(CONFIRMATION_EMAIL, {
    onCompleted: response =>
      authContext.login({ ...response.confirmationEmail }),
  });

  const handleSubmit = () => {
    sendCode({
      variables: {
        code,
        email,
      },
    });
  };

  return (
    <CodeInputModalContainer>
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
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
          className="verification-code"
          autoComplete="off"
        >
          <ReactCodeInput
            fields={4}
            className="input-group"
            required
            onChange={e => setCode(e)}
          />

          <div className="buttons">
            <div className="resend-code-container">
              <p>Pode levar um tempo para o código chegar.</p>
              <div className="resend-code">
                <p>Caso não receba: </p>{' '}
                <button type="button">Reenviar código</button>
              </div>
            </div>
            <CAButton type="submit">ENVIAR</CAButton>
          </div>
        </form>
      </Modal>
    </CodeInputModalContainer>
  );
};

export default CodeInputModal;
