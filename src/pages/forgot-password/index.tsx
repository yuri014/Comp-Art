import React, { useEffect, useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { Snackbar, IconButton, ThemeProvider } from '@material-ui/core';

import Input from '@components/Input';
import Meta from '@components/SEO/Meta';
import Title from '@components/Title';
import ToggleThemeButton from '@components/ToggleTheme';
import { SEND_FORGOT_PASSWORD_EMAIL } from '@graphql/mutations/user';
import CAButton from '@styles/components/button';
import formTheme from '@styles/themes/FormTheme';
import ForgotPasswordContainer from './_styles';

interface IForm {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const inputRef = useRef(null);
  const [sendEmail] = useMutation(SEND_FORGOT_PASSWORD_EMAIL);
  const [showError, setShowError] = useState('');

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
        keywords="Comp-Art, comp-art, comp art, divulgação, arte, música, ilustrações, artistas, login, entrar"
      />
      <div className="toggle-button">
        <ToggleThemeButton />
      </div>
      <header>
        <Title />
      </header>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Envia seu e-mail para recuperar sua senha</h2>
          <Input
            name="email"
            placeholder="Digite seu e-mail"
            required
            type="email"
            refInput={inputRef}
          >
            E-mail
          </Input>
          <ThemeProvider theme={formTheme}>
            <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={!!showError}
              autoHideDuration={6000}
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
          <CAButton type="submit">ENVIAR</CAButton>
        </form>
      </main>
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;
