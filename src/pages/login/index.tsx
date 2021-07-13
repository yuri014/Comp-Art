import React, { useContext, useEffect, useRef, useState } from 'react';
import { ThemeProvider } from '@material-ui/core';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Footer from '@components/Footer';
import Input from '@components/Input';
import Meta from '@components/SEO/Meta';
import Title from '@components/Title';
import ToggleThemeButton from '@components/ToggleTheme';
import { AuthContext } from '@context/auth';
import { LOGIN_USER } from '@graphql/mutations/user';
import useSnackbar from '@hooks/useSnackbar';
import CAButton from '@styles/components/button';
import formTheme from '@styles/themes/FormTheme';
import LoginContainer from './_styles';

const CodeInputModal = dynamic(() => import('@components/CodeInputModal'));
const CASnackbar = dynamic(() => import('@components/CASnackbar'));

interface ILogin {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const inputRef = useRef(null);
  const authContext = useContext(AuthContext);
  const { clearSnackbar, setShowSnackbar, showSnackbar } = useSnackbar();
  const [showCodeForm, setShowCodeForm] = useState(false);
  const router = useRouter();

  const { handleSubmit, register, watch } = useForm<ILogin>({
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
    onError: ({ graphQLErrors }) => {
      setShowSnackbar({ message: graphQLErrors[0].message, variant: 'error' });
      setShowCodeForm(graphQLErrors[0].extensions.validateCode);
    },
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
        title="Login - Comp-Art"
        description="Faça seu login e divulgue sua arte ou ajude a divulgar e apreciar a arte de outros artistas."
        keywords="Comp-Art, comp-art, comp art, divulgação, arte, música, ilustrações, artistas, login, entrar"
      />
      <div className="toggle-button">
        <ToggleThemeButton />
      </div>
      <main>
        <Title />
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Faça seu login na plataforma</h2>
          <Input
            name="email"
            placeholder="Digite seu e-mail"
            required
            refInput={inputRef}
          >
            E-mail
          </Input>
          <Input
            placeholder="Digite sua senha"
            name="password"
            refInput={register}
            required
            type="password"
          >
            Senha
          </Input>

          <Link href="/forgot-password">
            <a>Esqueci minha senha</a>
          </Link>

          <ThemeProvider theme={formTheme}>
            <CASnackbar
              snackbarState={showSnackbar}
              clearSnackbar={clearSnackbar}
            />
          </ThemeProvider>
          <CAButton type="submit">ENTRAR</CAButton>

          <p className="register">
            Não tem uma conta?{' '}
            <Link href="/register">
              <a>Registre-se</a>
            </Link>
          </p>
        </form>
      </main>
      <Footer />
      {showCodeForm && (
        <CodeInputModal
          email={watch('email')}
          setShowModal={setShowCodeForm}
          setMessage={setShowSnackbar}
        />
      )}
    </LoginContainer>
  );
};

export default Login;
