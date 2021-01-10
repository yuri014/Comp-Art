import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';

import PressStartButton from '../../components/PressStartButton';
import { CONFIRMATION_EMAIL } from '../../graphql/mutations/user';

const ConfirmationEmail: React.FC = () => {
  const router = useRouter();
  const { token } = router.query;

  const [confirmEmail] = useMutation(CONFIRMATION_EMAIL);

  useEffect(() => {
    if (token) {
      confirmEmail({
        variables: { token },
      })
        .then(response => console.log(response))
        .catch(err => console.log({ err }));
    }
  }, [token]);

  return (
    <div>
      <PressStartButton>Login</PressStartButton>
    </div>
  );
};

export default ConfirmationEmail;
