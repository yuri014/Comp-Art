import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import {
  FaArrowLeft,
  FaArrowRight,
  FaGamepad,
  FaMobile,
  FaPalette,
} from 'react-icons/fa';

import { TextField } from '@material-ui/core';
import ArtistIcon from '../../assets/form-artist-icon.svg';
import UserIcon from '../../assets/form-user-icon.svg';
import Modal from '../../components/Modal';
import SingUpContainer from '../../styles/pages/register/style';

function SignUp(): JSX.Element {
  const [isArtist, setIsArtist] = useState(true);
  const [modalShow, setModalShow] = useState(false);

  return (
    <SingUpContainer>
      <Head>
        <title>Comp-Art</title>
      </Head>
      <div className="form-content">
        <div className="character-selection">
          <div className="selection-title">
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
              id="standard-basic"
              placeholder="Seu nome..."
              label="Standard"
              required
            />
            <TextField
              fullWidth
              id="standard-basic"
              placeholder="Seu sobrenome..."
              label="Standard"
              required
            />
            <TextField
              fullWidth
              id="standard-basic"
              placeholder="Seu user..."
              label="Standard"
              required
            />
            <TextField
              fullWidth
              id="standard-basic"
              placeholder="Seu email..."
              label="Standard"
              required
            />
            <TextField
              fullWidth
              id="standard-basic"
              placeholder="Sua senha..."
              label="Standard"
              required
              type="password"
            />
          </form>
          <div className="form-start-button desktop">
            <Link href="/home">
              <a>
                {isArtist
                  ? 'Cadastre me como Artista!'
                  : 'Cadastre me como Fã!'}
                {'\u00A0'}
              </a>
            </Link>
          </div>
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
              id="standard-basic"
              placeholder="Seu nome..."
              label="Standard"
              required
            />
            <TextField
              fullWidth
              id="standard-basic"
              placeholder="Seu sobrenome..."
              label="Standard"
              required
            />
            <TextField
              fullWidth
              id="standard-basic"
              placeholder="Seu user..."
              label="Standard"
              required
            />
            <TextField
              fullWidth
              id="standard-basic"
              placeholder="Seu email..."
              label="Standard"
              required
            />
            <TextField
              fullWidth
              id="standard-basic"
              placeholder="Sua senha..."
              label="Standard"
              required
              type="password"
            />
          </form>
        </div>
        <div className="press-start">
          <Link href="/home">
            <a>
              Start
              <FaGamepad />
            </a>
          </Link>
        </div>
      </Modal>
    </SingUpContainer>
  );
}

export default SignUp;
