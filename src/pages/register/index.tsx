import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { FaArrowLeft, FaArrowRight, FaMobile, FaPalette } from 'react-icons/fa';
import { ThemeProvider } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

import ArtistIcon from '../../assets/form-artist-icon.svg';
import UserIcon from '../../assets/form-user-icon.svg';
import Modal from '../../components/Modal';
import SingUpContainer from '../../styles/pages/register/styles';
import formTheme from '../../styles/themes/FormTheme';
import PressStartButton from '../../components/PressStartButton';

function SignUp(): JSX.Element {
  const [isArtist, setIsArtist] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
                {isArtist ? 'Sou Artista!' : 'Sou Fã!'}
                {'\u00A0'}
                {isArtist ? <FaPalette /> : <FaMobile />}
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
            <form className="forms">
              <TextField
                fullWidth
                placeholder="Seu user..."
                label="User"
                inputRef={inputRef}
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
            <button type="submit" className="form-start-button desktop">
              {isArtist ? 'Cadastre me como Artista!' : 'Cadastre me como Fã!'}
              {'\u00A0'}
              {isArtist ? <FaPalette /> : <FaMobile />}
            </button>
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
