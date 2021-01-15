import React, { useContext, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { TextField, ThemeProvider } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { FaGamepad } from 'react-icons/fa';
import { useMutation } from '@apollo/client';

import { useRouter } from 'next/dist/client/router';
import Monitor from '../../assets/monitor.svg';
import LoginContainer from '../../styles/pages/login/styles';
import formTheme from '../../styles/themes/FormTheme';
import { LOGIN_USER } from '../../graphql/mutations/user';
import { AuthContext } from '../../context/auth';
import ErrorMessage from '../../components/ErrorMessage';

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
  }, []);

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
    <LoginContainer>
      <Head>
        <title>Comp-Art</title>
      </Head>
      <div className="login-content">
        <div id="login-title" className="main-title">
          Load Game
        </div>
        <div className="login-form">
          <div className="login-icon">
            <Monitor />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="login-form-content"
          >
            <ThemeProvider theme={formTheme}>
              <TextField
                fullWidth
                name="email"
                placeholder="Seu email..."
                inputRef={inputRef}
                label="Email"
                required
              />
              <TextField
                fullWidth
                placeholder="Sua senha..."
                label="Senha"
                name="password"
                inputRef={register()}
                required
                type="password"
              />
              <div className="login-error">
                {showError && (
                  <ErrorMessage>
                    <p>{showError}</p>
                  </ErrorMessage>
                )}
              </div>
              <button type="submit" className="login-button">
                Start&nbsp;
                <FaGamepad />
              </button>
            </ThemeProvider>
          </form>
        </div>
      </div>
    </LoginContainer>
  );
};

export default Login;
