import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { FaArrowLeft, FaArrowRight, FaMobile, FaPalette } from 'react-icons/fa';
import { ThemeProvider } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';

import ArtistIcon from '../../assets/form-artist-icon.svg';
import UserIcon from '../../assets/form-user-icon.svg';
import Modal from '../../components/Modal';
import SingUpContainer from '../../styles/pages/register/styles';
import formTheme from '../../styles/themes/FormTheme';
import PressStartButton from '../../components/PressStartButton';
import { IUser } from '../../interfaces/User';
import REGISTER_USER from '../../graphql/mutations/user';
import ErrorMessage from '../../components/ErrorMessage';

function SignUp(): JSX.Element {
  const [isArtist, setIsArtist] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [showError, setShowError] = useState('');
  const inputRef = useRef(null);
  const [registerUser] = useMutation(REGISTER_USER);

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
  }, []);

  const onSubmit = (data: IUser) => {
    registerUser({
      variables: { registerInput: { ...data, isArtist } },
    }).catch(err => {
      const { graphQLErrors } = err;
      setShowError(graphQLErrors[0].extensions.errors.duplicate);
    });
  };

  return (
    <SingUpContainer>
      <Head>
        <title>Comp-Art</title>
      </Head>
      <ThemeProvider theme={formTheme}>
        <div className="form-content">
          <div className="character-selection">
            <div className="main-title">
              Character <br /> Selection
            </div>
            <div className="form-image">
              {isArtist ? <ArtistIcon /> : <UserIcon />}
            </div>
            <div className="selection-buttons">
              <span className="arrow-selection">
                <FaArrowLeft onClick={() => setIsArtist(!isArtist)} />
              </span>
              <div
                className="form-start-button"
                onClick={() => setModalShow(true)}
                onKeyDown={() => setModalShow(true)}
                role="button"
                tabIndex={0}
              >
                {isArtist ? (
                  <>
                    Sou Artista!
                    {'\u00A0'}
                    <FaPalette />
                  </>
                ) : (
                  <>
                    Sou Fã!
                    {'\u00A0'}
                    <FaMobile />
                  </>
                )}
              </div>
              <span className="arrow-selection">
                <FaArrowRight onClick={() => setIsArtist(!isArtist)} />
              </span>
            </div>
          </div>
          <div className="form-character">
            <div className="form-character-title">
              <h2>Faça seu cadastro!</h2>
              <hr />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="forms">
              <TextField
                autoFocus
                fullWidth
                name="username"
                error={!!errors.username}
                helperText={
                  // eslint-disable-next-line operator-linebreak
                  errors.username &&
                  'Utilize um username de no mínimo 6 letras e no máximo 24 letras'
                }
                inputRef={inputRef}
                placeholder="Seu user..."
                label="User"
                required
              />
              <TextField
                fullWidth
                name="email"
                error={!!errors.email}
                helperText={errors.email && 'Utilize um email válido'}
                placeholder="Seu email..."
                inputRef={register({
                  pattern: /^\S+@\S+$/,
                  required: true,
                })}
                label="Email"
                required
              />
              <TextField
                fullWidth
                placeholder="Sua senha..."
                label="Senha"
                name="password"
                error={!!errors.password}
                helperText={
                  // eslint-disable-next-line operator-linebreak
                  errors.password &&
                  'Sua senha deve ter no mínimo 8 caracteres e conter uma letra maiúscula, uma letra minúscula, um número e um caracter especial.'
                }
                inputRef={register({
                  minLength: 8,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  required: true,
                })}
                required
                type="password"
              />
              <TextField
                fullWidth
                placeholder="Confirme sua senha..."
                label="Confirme sua senha"
                required
                error={!!errors.confirmPassword}
                helperText={
                  // eslint-disable-next-line operator-linebreak
                  errors.confirmPassword && 'Senhas não conferem'
                }
                name="confirmPassword"
                inputRef={register({
                  validate: (value: string) => value === watch('password'),
                  required: true,
                })}
                type="password"
              />
              {showError && <ErrorMessage>{showError}</ErrorMessage>}
              <button type="submit" className="form-start-button desktop">
                {isArtist ? (
                  <>
                    Cadastre me como Artista!
                    {'\u00A0'}
                    <FaPalette />
                  </>
                ) : (
                  <>
                    Cadastre me como Fã!
                    {'\u00A0'}
                    <FaMobile />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
        <Modal
          title="Faça seu cadastro!"
          show={modalShow}
          onHide={() => setModalShow(false)}
        >
          <div className="modal-body">
            <form className="forms">
              <TextField
                fullWidth
                placeholder="Seu user..."
                label="User"
                required
              />
              <TextField
                fullWidth
                placeholder="Seu email..."
                label="Email"
                required
              />
              <TextField
                fullWidth
                placeholder="Sua senha..."
                label="Senha"
                required
                type="password"
              />
            </form>
          </div>
          <Link href="/home">
            <a>
              <PressStartButton>Start</PressStartButton>
            </a>
          </Link>
        </Modal>
      </ThemeProvider>
    </SingUpContainer>
  );
}

export default SignUp;
