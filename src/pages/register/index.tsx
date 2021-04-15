import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaArrowLeft, FaTimes } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { IconButton, Snackbar, ThemeProvider } from '@material-ui/core';

import { IUser } from '../../interfaces/User';
import { REGISTER_USER } from '../../graphql/mutations/user';
import Meta from '../../components/SEO/Meta';
import RegisterContainer from './_styles';
import Title from '../../components/Title';
import ToggleThemeButton from '../../components/ToggleTheme';
import Footer from '../../components/Footer';
import ChooseProfile from '../../components/Splitter/ChooseProfile';
import Input from '../../components/Input';
import CAButton from '../../styles/components/button';
import formTheme from '../../styles/themes/FormTheme';
import registerUserSchema from '../../validations/register';

function SignUp(): JSX.Element {
  const [isArtist, setIsArtist] = useState(true);
  const [sucessModalShow, setSuccessModalShow] = useState(false);
  const [showError, setShowError] = useState('');
  const inputRef = useRef(null);
  const [registerUser] = useMutation(REGISTER_USER, {
    onCompleted: () => setSuccessModalShow(true),
    onError: ({ graphQLErrors }) =>
      setShowError(graphQLErrors[0].extensions.errors.duplicate),
  });

  const { register, handleSubmit, errors, watch } = useForm<IUser>({
    mode: 'onChange',
    resolver: yupResolver(registerUserSchema),
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (inputRef.current) {
      register(inputRef.current);
      inputRef.current.focus();
    }
  }, [register]);

  const onSubmit = (data: IUser) => {
    registerUser({
      variables: { registerInput: { ...data, isArtist } },
    });
  };

  return (
    <>
      <Meta
        uri="register"
        title="Comp-Art - Cadastre-se"
        description="Cadastre-se para divulgar sua arte ou para apreciar a divulgar e apreciar a arte de outros artistas."
        keywords="Comp-Art, comp-art, comp art, divulgação, arte, música, ilustrações, artistas, cadastro, entrar"
      />
      <RegisterContainer className="container">
        <div className="toggle-button">
          <ToggleThemeButton />
        </div>
        <main>
          <Title />
          <ChooseProfile isArtist={isArtist} setIsArtist={setIsArtist} />
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Link href="/login">
              <a className="go-back-login">
                <FaArrowLeft /> Voltar para login
              </a>
            </Link>
            <h2>Crie sua conta</h2>
            <p className="subtitle">
              Junte-se a milhares de artistas e fãs, venha divulgar seus
              trabalhos!
            </p>

            <div className="input-group">
              <Input
                name="username"
                placeholder="Digite seu username"
                refInput={inputRef}
                error={!!errors.username && errors.username.message}
                required
              >
                Username
              </Input>
              <Input
                name="email"
                placeholder="Digite seu e-mail"
                refInput={register({
                  pattern: /^\S+@\S+$/,
                  required: true,
                })}
                error={!!errors.email && errors.email.message}
                required
              >
                E-mail
              </Input>
              <Input
                name="password"
                placeholder="Digite sua senha"
                refInput={register({
                  minLength: 8,
                  required: true,
                })}
                error={!!errors.password && errors.password.message}
                type="password"
                required
              >
                Senha
              </Input>
              <Input
                name="confirmPassword"
                placeholder="Digite novamente sua senha"
                refInput={register({
                  validate: (value: string) => value === watch('password'),
                })}
                error={
                  !!errors.confirmPassword && errors.confirmPassword.message
                }
                type="password"
                required
              >
                Confirmar Senha
              </Input>
            </div>
            <CAButton type="submit">CADASTRAR</CAButton>

            <div className="contract">
              <p>
                Ao se registrar, você aceita nossos{' '}
                <Link href="/terms">
                  <a>termos de uso</a>
                </Link>{' '}
                e a nossa{' '}
                <Link href="/terms">
                  <a>política de privacidade.</a>
                </Link>
              </p>
            </div>
            <ThemeProvider theme={formTheme}>
              <Snackbar
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={!!showError}
                autoHideDuration={1800}
                onClose={() => setShowError('')}
                message={showError}
                action={
                  <IconButton
                    size="small"
                    aria-label="fechar menu post"
                    onClick={() => setShowError('')}
                  >
                    <FaTimes />
                  </IconButton>
                }
              />
            </ThemeProvider>
          </form>
        </main>
        <Footer />
      </RegisterContainer>
    </>
  );
}

export default SignUp;
