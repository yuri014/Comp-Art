import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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
  FaHashtag,
  FaLink,
  FaPinterest,
  FaSoundcloud,
  FaTwitter,
} from 'react-icons/fa';

import { IProfileInput } from '../../interfaces/Profile';
import formTheme from '../../styles/themes/FormTheme';
import TagsContainer from '../../styles';
import PressStartButton from '../PressStartButton';
import ErrorMessage from '../ErrorMessage';

interface FormProfileProps {
  onSubmit: (_args0: IProfileInput) => void;
  coverImagePreview: string;
  setCoverImage: (_args0: React.ChangeEvent<HTMLInputElement>) => void;
  profileImagePreview: string;
  setProfileImage: (_args0: React.ChangeEvent<HTMLInputElement>) => void;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  showError: string;
  setShowError: (_args0: React.SetStateAction<string>) => void;
}

const FormProfile: React.FC<FormProfileProps> = ({
  coverImagePreview,
  onSubmit,
  profileImagePreview,
  setCoverImage,
  setProfileImage,
  tags,
  setTags,
  showError,
  setShowError,
}) => {
  const { register, handleSubmit, errors } = useForm<IProfileInput>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const [tagInput, setTagInput] = useState('');

  return (
    <ThemeProvider theme={formTheme}>
      <form onSubmit={handleSubmit(onSubmit)} className="forms">
        <div className="profile-image-cover">
          {coverImagePreview ? (
            <img src={coverImagePreview as string} alt="Capa do perfil" />
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
                onChange={e => setCoverImage(e)}
              />
            </IconButton>
          </label>
        </div>
        <div className="profile-image-upload">
          {profileImagePreview ? (
            <img src={profileImagePreview as string} alt="Imagem do perfil" />
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
                onChange={e => setProfileImage(e)}
              />
            </IconButton>
          </label>
        </div>
        <div className="inputs">
          <TextField
            fullWidth
            name="name"
            id="name"
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
              id="bio"
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
            id="tags"
            helperText="Aperte vírgula cadastrar uma tag - clique nela para remover"
            placeholder="Coloque aqui seus gostos preferidos"
            label="Tags"
            value={tagInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaHashtag className="secondary-icon" />
                </InputAdornment>
              ),
            }}
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
              id="links.soundcloud"
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
              id="links.bandcamp"
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
              id="links.wattpad"
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
              id="links.pinterest"
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
              id="links.twitter"
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
              id="links.facebook"
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
              id="links.deviantart"
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
              id="links.customLink"
              label="Link Adicional"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaLink className="primary-icon" />
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
  );
};

export default FormProfile;
