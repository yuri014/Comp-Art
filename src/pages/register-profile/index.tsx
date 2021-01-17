import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/dist/client/router';
import { SiWattpad } from 'react-icons/si';
import {
  IconButton,
  InputAdornment,
  NoSsr,
  TextField,
  ThemeProvider,
} from '@material-ui/core';
import {
  FaBandcamp,
  FaCameraRetro,
  FaDeviantart,
  FaFacebook,
  FaLink,
  FaPinterest,
  FaSoundcloud,
  FaTwitter,
} from 'react-icons/fa';

import RegisterProfileContainer from '../../styles/pages/register-profile/styles';
import formTheme from '../../styles/themes/FormTheme';
import PressStartButton from '../../components/PressStartButton';
import { IProfileInput } from '../../interfaces/Profile';
import REGISTER_ARTIST_PROFILE from '../../graphql/mutations/profile';
import ErrorMessage from '../../components/ErrorMessage';
import withAuth from '../../hocs/withAuth';
import TagsContainer from '../../styles';

interface ImagePreview {
  preview: string | ArrayBuffer;
  file: string | File;
}
interface ImageState {
  profile: ImagePreview;
  cover: ImagePreview;
}

const RegisterProfile: React.FC = () => {
  const router = useRouter();
  const [showError, setShowError] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [imagePreview, setImagePreview] = useState<ImageState>({
    profile: {
      preview: '',
      file: '',
    },
    cover: { preview: '', file: '' },
  });

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    profile: boolean,
  ) => {
    const reader = new FileReader();

    const file = e.target.files[0];
    reader.onloadend = () => {
      if (profile) {
        setImagePreview({
          ...imagePreview,
          profile: { preview: reader.result, file },
        });
      } else {
        setImagePreview({
          ...imagePreview,
          cover: { preview: reader.result, file },
        });
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const [createProfile] = useMutation(REGISTER_ARTIST_PROFILE, {
    onCompleted: () => router.push('/home'),
    onError: ({ graphQLErrors }) =>
      setShowError(graphQLErrors[0].extensions.errors),
  });

  const { register, handleSubmit, errors } = useForm<IProfileInput>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: IProfileInput) => {
    createProfile({
      variables: {
        profile: {
          ...data,
          avatar: imagePreview.profile.file,
          coverImage: imagePreview.cover.file,
          hashtags: tags,
        },
      },
    });
  };

  return (
    <RegisterProfileContainer>
      <div id="register-profile-title" className="main-title">
        <h1>Crie seu perfil!</h1>
      </div>
      <ThemeProvider theme={formTheme}>
        <form onSubmit={handleSubmit(onSubmit)} className="forms">
          <div className="profile-image-cover">
            {imagePreview.cover.preview ? (
              <img
                src={imagePreview.cover.preview as string}
                alt="Capa do perfil"
              />
            ) : (
              <div className="holder" />
            )}
            <label htmlFor="uploadCoverButton">
              <IconButton aria-label="upload picture" component="span">
                <FaCameraRetro className="upload-icon" />
                <input
                  accept="image/*"
                  name="coverImage"
                  id="uploadCoverButton"
                  type="file"
                  onChange={e => handleImage(e, false)}
                />
              </IconButton>
            </label>
          </div>
          <div className="profile-image-upload">
            {imagePreview.profile.preview ? (
              <img
                src={imagePreview.profile.preview as string}
                alt="Imagem do perfil"
              />
            ) : (
              <a
                href="https://www.pexels.com/pt-br/foto/foto-de-silhueta-de-mulher-1446948/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/profile.jpg" alt="Imagem do perfil" />
              </a>
            )}
            <label htmlFor="uploadButton">
              <IconButton aria-label="upload picture" component="span">
                <FaCameraRetro className="upload-icon" />
                <input
                  accept="image/*"
                  name="avatar"
                  id="uploadButton"
                  type="file"
                  onChange={e => handleImage(e, true)}
                />
              </IconButton>
            </label>
          </div>
          <div className="inputs">
            <TextField
              fullWidth
              name="name"
              error={!!errors.name}
              helperText={errors.name && 'Nome é obrigatório'}
              inputRef={register({
                required: true,
              })}
              placeholder="Seu nome..."
              label="Nome"
              required
            />
            <br />
            <br />
            <NoSsr>
              <TextField
                fullWidth
                name="bio"
                inputRef={register}
                placeholder="Sua bio..."
                label="Bio"
                variant="outlined"
                multiline
                rows={2}
                rowsMax={4}
                style={{ marginBottom: '0' }}
              />
            </NoSsr>
            <TagsContainer>
              {tags.map(tag => (
                <button
                  type="button"
                  onClick={() =>
                    setTags(tags.filter(tagToRemove => tagToRemove !== tag))
                  }
                  style={{ marginBottom: '2rem' }}
                  key={tag}
                >
                  {tag}
                </button>
              ))}
            </TagsContainer>
            <TextField
              fullWidth
              name="tags"
              helperText="Aperte vírgula cadastrar uma tag - clique nela para remover"
              placeholder="Coloque aqui seus gostos preferidos"
              label="Tags"
              value={tagInput}
              onChange={e =>
                e.target.value !== ',' && setTagInput(e.target.value)
              }
              onKeyDown={e => {
                if (e.key === ',') {
                  if (tags.length <= 4 && !tags.includes(`#${tagInput}`)) {
                    setTags([...tags, `#${tagInput}`]);
                    setTagInput('');
                  } else {
                    setShowError('Limite de 5 hashtags sem repetição!');
                  }
                }
              }}
            />
            <div className="profile-links">
              <TextField
                inputRef={register}
                fullWidth
                name="links.soundcloud"
                label="Soundcloud"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaSoundcloud className="soundcloud-icon" />
                      <p className="link-label">soundcloud.com/</p>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                inputRef={register}
                fullWidth
                name="links.bandcamp"
                label="Bandcamp"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaBandcamp className="bandcamp-icon" />
                    </InputAdornment>
                  ),
                  endAdornment: <p className="link-label-end">.bandcamp.com</p>,
                }}
              />
              <TextField
                inputRef={register}
                fullWidth
                name="links.wattpad"
                label="Wattpad"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SiWattpad className="wattpad-icon" />
                      <p className="link-label">wattpad.com/user/</p>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                inputRef={register}
                fullWidth
                name="links.pinterest"
                label="Pinterest"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaPinterest className="pinterest-icon" />
                      <p className="link-label">pinterest.com/</p>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                inputRef={register}
                fullWidth
                name="links.twitter"
                label="Twitter"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaTwitter className="twitter-icon" />
                      <p className="link-label">twitter.com/</p>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                inputRef={register}
                fullWidth
                name="links.facebook"
                label="Facebook"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaFacebook className="facebook-icon" />
                      <p className="link-label">facebook.com/</p>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                inputRef={register}
                fullWidth
                name="links.deviantart"
                label="Deviantart"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaDeviantart className="deviantart-icon" />
                      <p className="link-label">deviantart.com/</p>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                inputRef={register}
                fullWidth
                name="links.customLink"
                label="Link Adicional"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaLink className="additional-link" />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            {showError && <ErrorMessage>{showError}</ErrorMessage>}
            <PressStartButton type="submit">Start</PressStartButton>
          </div>
        </form>
      </ThemeProvider>
    </RegisterProfileContainer>
  );
};

export default withAuth(RegisterProfile);
