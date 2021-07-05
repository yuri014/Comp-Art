import React, { useRef, useState } from 'react';

import { InputContainer } from '@components/Input/styles';
import { ModalProvider } from '@context/modal';
import CAButton from '@styles/components/button';
import DeleteAccountModalContainer, { DeleteAccountMessage } from './styles';

const message = 'Podemos continuar amigos';

const DeleteAccount: React.FC = () => {
  const inputRef = useRef(null);

  const [hasError, setHasErrors] = useState(false);
  const [response, setResponse] = useState('');
  const [showModal, setShowModal] = useState(false);

  const canDelete = () => {
    if (response === message) {
      console.log('');
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
                Caso deseje realmente continuar, digite a frase:
                <div> &quot;{message}&quot;</div>
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
