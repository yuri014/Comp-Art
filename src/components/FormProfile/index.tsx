import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SiWattpad } from 'react-icons/si';
import {
  IconButton,
  InputAdornment,
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

import { IProfile, IProfileInput } from '../../interfaces/Profile';
import formTheme from '../../styles/themes/FormTheme';
import TagsContainer from '../../styles';
import PressStartButton from '../PressStartButton';
import ErrorMessage from '../ErrorMessage';
import FormProfileContainer from './styles';

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
  defaultValues?: IProfile;
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
  defaultValues,
}) => {
  const { register, handleSubmit, errors, setValue } = useForm<IProfileInput>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const [tagInput, setTagInput] = useState('');
  const [oldProfileImage, setOldProfileImage] = useState('');
  const [oldCoverImage, setOldCoverImage] = useState('');

  useEffect(() => {
    if (defaultValues) {
      setTags(defaultValues.hashtags ? defaultValues.hashtags : []);
      setValue('name', defaultValues.name);
      setValue('bio', defaultValues.bio);

      const { links } = defaultValues;

      setValue('links.bandcamp', links.bandcamp);
      setValue('links.soundcloud', links.soundcloud);
      setValue('links.customLink', links.customLink);
      setValue('links.deviantart', links.deviantart);
      setValue('links.facebook', links.facebook);
      setValue('links.pinterest', links.pinterest);
      setValue('links.twitter', links.twitter);
      setValue('links.wattpad', links.wattpad);

      setOldProfileImage(
        process.env.NEXT_PUBLIC_API_HOST + defaultValues.avatar,
      );

      if (defaultValues.coverImage) {
        setOldCoverImage(
          process.env.NEXT_PUBLIC_API_HOST + defaultValues.coverImage,
        );
      }
    }
  }, [defaultValues, setTags, setValue]);

  return (
    <ThemeProvider theme={formTheme}>
      <FormProfileContainer onSubmit={handleSubmit(onSubmit)} className="forms">
        <div className="profile-image-cover">
          {coverImagePreview ? (
            <img src={coverImagePreview as string} alt="Capa do perfil" />
          ) : (
            <>
              {oldCoverImage ? (
                <img src={oldCoverImage} alt="Capa do perfil" />
              ) : (
                <div className="holder" />
              )}
            </>
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
            <img src={oldProfileImage} alt="Imagem do perfil" />
          )}

          <label htmlFor="uploadButton">
            <IconButton aria-label="upload picture" component="span">
              <FaCameraRetro className="upload-icon" />
              <input
                accept="image/*"
                name="avatar"
                id="uploadButton"
                type="file"
                onChange={e => {
                  setProfileImage(e);
                }}
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
      </FormProfileContainer>
    </ThemeProvider>
  );
};

export default FormProfile;
