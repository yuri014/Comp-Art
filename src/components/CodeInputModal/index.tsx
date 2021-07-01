import React, { useContext, useState } from 'react';
import ReactCodeInput from 'react-verification-code-input';
import { useMutation } from '@apollo/client';

import CAButton from '@styles/components/button';
import {
  CONFIRMATION_EMAIL,
  RESEND_CONFIRMATION_CODE,
} from '@graphql/mutations/user';
import { AuthContext } from '@context/auth';
import { useRouter } from 'next/router';
import { ModalProvider } from '@context/modal';
import { CodeInputHeaderContainer, CodeInputModalContainer } from './styles';

interface CodeInputModalProps {
  email: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const CodeInputModal: React.FC<CodeInputModalProps> = ({
  email,
  setShowModal,
  setError,
}) => {
  const router = useRouter();
  const [code, setCode] = useState('');
  const authContext = useContext(AuthContext);
  const [confirmEmail] = useMutation(CONFIRMATION_EMAIL, {
    onCompleted: response => {
      authContext.login({ ...response.confirmationEmail });
      router.push('/confirmation-email');
    },
    onError: ({ graphQLErrors }) => setError(graphQLErrors[0].message),
  });

  const [resendConfirmationCode] = useMutation(RESEND_CONFIRMATION_CODE, {
    onCompleted: () => setError('Seu código foi enviado!'),
    onError: ({ graphQLErrors }) => setError(graphQLErrors[0].message),
  });

  const handleSubmit = () => {
    confirmEmail({
      variables: {
        code,
        email,
      },
    });
  };

  return (
    <ModalProvider
      title="Quase lá, vai ser jogo rápido!"
      text={
        <CodeInputHeaderContainer>
          <p>
            Já enviamos um código para o seu e-mail <span>{email}</span>
          </p>
          <p>
            Verifique sua caixa de entrada e insira o código no campo abaixo
            para verificar seu e-mail
          </p>
        </CodeInputHeaderContainer>
      }
      onHide={() => setShowModal(false)}
    >
      <CodeInputModalContainer
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
              <button
                type="button"
                onClick={() =>
                  resendConfirmationCode({
                    variables: {
                      email,
                    },
                  })
                }
              >
                Reenviar código
              </button>
            </div>
          </div>
          <CAButton type="submit">ENVIAR</CAButton>
        </div>
      </CodeInputModalContainer>
    </ModalProvider>
  );
};

export default CodeInputModal;
