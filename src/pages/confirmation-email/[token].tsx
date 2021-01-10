import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';

import Link from 'next/link';
import PressStartButton from '../../components/PressStartButton';
import { CONFIRMATION_EMAIL } from '../../graphql/mutations/user';
import ConfirmationEmailContainer from '../../styles/pages/confirmation-email/styles';

const ConfirmationEmail: React.FC = () => {
  const router = useRouter();
  const { token } = router.query;
  const [hasError, setHasErrors] = useState(false);

  const [confirmEmail] = useMutation(CONFIRMATION_EMAIL);

  useEffect(() => {
    if (token) {
      confirmEmail({
        variables: { token },
      }).catch(() => setHasErrors(true));
    }
  }, [token]);

  return (
    <ConfirmationEmailContainer>
      {!hasError ? (
        <div className="confirm-email-message">
          <h1>Sua conta agora está ativa!</h1>
          <PressStartButton>
            <Link href="/home">
              <a>Start</a>
            </Link>
          </PressStartButton>
        </div>
      ) : (
        <div className="error-confirm-email">
          <h1>OPS! Aconteceu algo de errado na confirmação do seu email!</h1>
          <h2>Refaça seu login para gerar um novo email</h2>
          <PressStartButton>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </PressStartButton>
        </div>
      )}
    </ConfirmationEmailContainer>
  );
};

export default ConfirmationEmail;
