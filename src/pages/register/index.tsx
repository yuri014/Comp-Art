import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { ThemeProvider } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';

import formTheme from '../../styles/themes/FormTheme';
import { IUser } from '../../interfaces/User';
import { REGISTER_USER } from '../../graphql/mutations/user';
import ErrorMessage from '../../components/ErrorMessage';
import Meta from '../../components/SEO/Meta';
import RegisterContainer from './_styles';
import Title from '../../components/Title';
import ToggleThemeButton from '../../components/ToggleTheme';
import Footer from '../../components/Footer';
import ChooseProfile from '../../components/Splitter/ChooseProfile';
import Input from '../../components/Input';

function SignUp(): JSX.Element {
  const [isArtist, setIsArtist] = useState(true);
  const [modalShow, setModalShow] = useState(false);
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
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (inputRef.current) {
      register(inputRef.current, {
        minLength: 6,
        maxLength: 24,
        required: true,
      });
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

            <Input
              name="username"
              placeholder="Digite seu username"
              ref={inputRef}
              required
            >
              Username
            </Input>
            <Input
              name="email"
              placeholder="Digite seu e-mail"
              ref={register({
                pattern: /^\S+@\S+$/,
                required: true,
              })}
              required
            >
              E-mail
            </Input>
            <Input
              name="password"
              placeholder="Digite sua senha"
              ref={register({
                minLength: 8,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                required: true,
              })}
              required
            >
              Senha
            </Input>
            <Input
              name="confirmPassword"
              placeholder="Digite novamente sua senha"
              ref={register({
                validate: (value: string) => value === watch('password'),
                required: true,
              })}
              required
            >
              Confirmar Senha
            </Input>
          </form>
        </main>
        <Footer />
      </RegisterContainer>
    </>
  );
}

export default SignUp;
