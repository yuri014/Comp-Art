import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { FaTimes } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconButton, Snackbar, ThemeProvider } from '@material-ui/core';

import Meta from '@components/SEO/Meta';
import Title from '@components/Title';
import ToggleThemeButton from '@components/ToggleTheme';
import { AuthContext } from '@context/auth';
import { RECOVER_PASSWORD } from '@graphql/mutations/user';
import formTheme from '@styles/themes/FormTheme';
import Footer from '@components/Footer';
import Input from '@components/Input';
import CAButton from '@styles/components/button';
import { createUserSchema } from '@validations/register';
import ForgotPasswordContainer from './_styles';

interface IForm {
  password: string;
  confirmPassword: string;
}

const passwordValidationSchema = createUserSchema();

const RecoverPassword: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [showError, setShowError] = useState('');
  const {
    push,
    query: { token },
  } = useRouter();

  const [sendNewPassword] = useMutation(RECOVER_PASSWORD, {
    onCompleted: response => {
      authContext.login(response.recoverPassword);
      push('/home');
    },
    onError: ({ graphQLErrors }) => {
      setShowError(graphQLErrors[0].message);
    },
  });

  const { register, handleSubmit, errors, watch } = useForm<IForm>({
    mode: 'onChange',
    resolver: yupResolver(passwordValidationSchema),
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: IForm) => {
    sendNewPassword({
      variables: {
        token,
        newPassword: data.password,
        confirmPassword: data.confirmPassword,
      },
    });
  };

  return (
    <ForgotPasswordContainer className="container">
      <Meta
        uri="forgot-password"
        title="Recuperar minha senha - Comp-Art"
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
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Input
            name="password"
            placeholder="Digite sua senha"
            required
            type="password"
            refInput={register({
              minLength: 8,
              required: true,
            })}
            error={!!errors.password && errors.password.message}
          >
            Nova Senha
          </Input>
          <Input
            name="confirmPassword"
            placeholder="Confirme sua senha"
            required
            type="password"
            refInput={register({
              validate: (value: string) => value === watch('password'),
            })}
            error={!!errors.confirmPassword && errors.confirmPassword.message}
          >
            Confirmar Senha
          </Input>
          <CAButton type="submit">ENVIAR</CAButton>
        </form>
      </main>
      <Footer />
      <ThemeProvider theme={formTheme}>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={!!showError}
          autoHideDuration={4000}
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
    </ForgotPasswordContainer>
  );
};

export default RecoverPassword;
