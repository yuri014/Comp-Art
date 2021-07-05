import React, { useContext, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';

import { InputContainer } from '@components/Input/styles';
import { AuthContext } from '@context/auth';
import { ModalProvider } from '@context/modal';
import CAButton from '@styles/components/button';
import DeleteAccountModalContainer, { DeleteAccountMessage } from './styles';

const DELETE_ACCOUNT = gql`
  mutation DeleteAccount {
    deleteAccount
  }
`;

const message = 'Podemos continuar amigos';

const DeleteAccount: React.FC = () => {
  const inputRef = useRef(null);
  const router = useRouter();
  const auth = useContext(AuthContext);

  const [hasError, setHasErrors] = useState(false);
  const [response, setResponse] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [deleteAccount] = useMutation(DELETE_ACCOUNT, {
    ignoreResults: true,
    onCompleted: () => {
      auth.logout();
      router.push('/');
    },
  });

  const canDelete = () => {
    if (response === message) {
      deleteAccount();
    } else {
      inputRef.current.focus();
      setHasErrors(true);
    }
  };

  return (
    <button
      type="button"
      onClick={() => setShowModal(true)}
      className="delete-account"
    >
      DELETAR CONTA
      {showModal && (
        <ModalProvider
          onHide={() => setShowModal(false)}
          title="Deletar Conta"
          text={
            <DeleteAccountMessage>
              <p>
                Ao realizar essa operação,{' '}
                <span>todos seus dados serão apagados</span>.
              </p>
              <p>
                Seus arquivos de mídia poderão levar mais tempo para serem
                apagados.
              </p>
              <br />
              <p>
                Caso deseja realmente continuar, digite a frase:
                <span className="message"> &quot;{message}&quot;</span>
              </p>
            </DeleteAccountMessage>
          }
        >
          <DeleteAccountModalContainer>
            <InputContainer
              type="text"
              onChange={e => setResponse(e.target.value)}
              className={hasError ? 'input-error' : ''}
              ref={inputRef}
              placeholder="Digite a mensagem aqui"
            />
            {hasError && <p>Mensagem não confere</p>}
            <CAButton type="button" onClick={() => canDelete()}>
              Deletar Conta
            </CAButton>
          </DeleteAccountModalContainer>
        </ModalProvider>
      )}
    </button>
  );
};

export default DeleteAccount;
