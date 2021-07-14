import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';

import Input from '@components/Input';
import Meta from '@components/SEO/Meta';
import Title from '@components/Title';
import ToggleThemeButton from '@components/ToggleTheme';
import { SEND_FORGOT_PASSWORD_EMAIL } from '@graphql/mutations/user';
import useSnackbar from '@hooks/useSnackbar';
import CAButton from '@styles/components/button';
import Footer from '@components/Footer';
import ForgotPasswordContainer from './_styles';

const CASnackbar = dynamic(() => import('@components/CASnackbar'));

interface IForm {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const inputRef = useRef(null);
  const { clearSnackbar, setShowSnackbar, showSnackbar } = useSnackbar();

  const [sendEmail] = useMutation(SEND_FORGOT_PASSWORD_EMAIL, {
    onCompleted: () =>
      setShowSnackbar({
        message: 'Enviamos um e-mail com instruções para você!',
        variant: 'success',
      }),
    onError: ({ graphQLErrors }) =>
      setShowSnackbar({ variant: 'error', message: graphQLErrors[0].message }),
  });

  const { handleSubmit, register } = useForm<IForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (inputRef.current) {
      register(inputRef.current);
      inputRef.current.focus();
    }
  }, [register]);

  const onSubmit = ({ email }: IForm) => {
    sendEmail({ variables: { email } });
  };

  return (
    <ForgotPasswordContainer className="container">
      <Meta
        uri="forgot-password"
        title="Esqueci minha senha - Comp-Art"
        description="Recupere sua senha para continuar na plataforma."
        keywords="Comp-Art, comp-art, comp art, recuperar senha, esqueci minha senha, senha"
      />
      <div className="toggle-button">
        <ToggleThemeButton />
      </div>
      <header>
        <Title />
      </header>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Esqueci minha senha</h2>
          <Input
            name="email"
            placeholder="Digite seu e-mail"
            required
            type="email"
            refInput={inputRef}
          >
            E-mail
          </Input>
          <CASnackbar
            snackbarState={showSnackbar}
            clearSnackbar={clearSnackbar}
          />
          <p>
            Iremos enviar um e-mail para você com as instruções necessárias.
          </p>
          <CAButton type="submit">ENVIAR</CAButton>
        </form>
      </main>
      <Footer />
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;
