import React from 'react';
import Head from 'next/head';
import { TextField, ThemeProvider } from '@material-ui/core';
import { FaGamepad } from 'react-icons/fa';

import Monitor from '../../assets/monitor.svg';
import LoginContainer from '../../styles/pages/login/styles';
import formTheme from '../../styles/themes/FormTheme';

const Login: React.FC = () => (
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
        <form className="login-form-content">
          <ThemeProvider theme={formTheme}>
            <TextField
              fullWidth
              placeholder="Seu email..."
              label="Email"
              required
              type="email"
            />
            <TextField
              fullWidth
              placeholder="Sua senha..."
              label="Senha"
              required
              type="password"
            />
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

export default Login;
