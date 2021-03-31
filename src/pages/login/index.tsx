import React, { useContext, useEffect, useRef, useState } from 'react';
import { IconButton, Snackbar, ThemeProvider } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { useMutation } from '@apollo/client';

import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import LoginContainer from './_styles';
import formTheme from '../../styles/themes/FormTheme';
import { LOGIN_USER } from '../../graphql/mutations/user';
import { AuthContext } from '../../context/auth';
import Meta from '../../components/SEO/Meta';
import ToggleThemeButton from '../../components/ToggleTheme';
import Footer from '../../components/Footer';
import Title from '../../components/Title';

interface ILogin {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const inputRef = useRef(null);
  const authContext = useContext(AuthContext);
  const [showError, setShowError] = useState('');
  const router = useRouter();

  const { handleSubmit, register } = useForm<ILogin>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (inputRef.current) {
      register(inputRef.current);
      inputRef.current.focus();
    }
  }, [register]);

  const [loginUser] = useMutation(LOGIN_USER, {
    onCompleted: response => {
      authContext.login(response.login);
      router.push('/home');
    },
    onError: ({ graphQLErrors }) =>
      setShowError(graphQLErrors[0].extensions.errors.general),
  });

  const onSubmit = (inputs: ILogin) => {
    loginUser({
      variables: { email: inputs.email, password: inputs.password },
    });
  };

  return (
    <LoginContainer className="container">
      <Meta
        uri="login"
        title="Comp-Art - Login"
        description="Faça seu login e divulgue sua arte ou ajude a divulgar e apreciar a arte de outros artistas."
        keywords="Comp-Art, comp-art, comp art, divulgação, arte, música, ilustrações, artistas, login, entrar"
      />
      <div className="toggle-button">
        <ToggleThemeButton />
      </div>
      <main>
        <Title />
        <form onSubmit={handleSubmit(onSubmit)} className="login-form-content">
          <h2>Faça seu login na plataforma</h2>
          <label htmlFor="email">
            <p>E-mail</p>
            <input
              id="email"
              name="email"
              placeholder="Digite seu e-mail"
              ref={inputRef}
              required
            />
          </label>
          <label htmlFor="password">
            <p>Senha</p>
            <input
              placeholder="Digite sua senha"
              id="password"
              name="password"
              ref={register}
              required
              type="password"
            />
          </label>

          <Link href="/forgot-password">
            <a>Esqueci minha senha</a>
          </Link>

          <ThemeProvider theme={formTheme}>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              open={!!showError}
              autoHideDuration={1000}
              onClose={() => setShowError('')}
              message={showError}
              action={
                <IconButton
                  size="small"
                  aria-label="fechar menu post"
                  onClick={() => setShowError('')}
                  color="secondary"
                >
                  <FaTimes />
                </IconButton>
              }
            />
          </ThemeProvider>
          <button type="submit" className="login-button">
            ENTRAR
          </button>

          <p className="register">
            Não tem uma conta?{' '}
            <Link href="/register">
              <a>Registre-se</a>
            </Link>
          </p>
        </form>
      </main>
      <Footer />
    </LoginContainer>
  );
};

export default Login;
