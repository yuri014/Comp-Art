import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DocumentNode, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { SiWattpad } from 'react-icons/si';
import { MdEdit } from 'react-icons/md';
import {
  IconButton,
  InputAdornment,
  TextField,
  ThemeProvider,
} from '@material-ui/core';
import {
  FaBandcamp,
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
import useImagePreview from '../../hooks/imagePreview';
import ProfileImagePreview from './ProfileImagePreview';
import { AuthContext } from '../../context/auth';

interface FormProfileProps {
  mutation: DocumentNode;
  defaultValues?: IProfile;
}

const FormProfile: React.FC<FormProfileProps> = ({
  defaultValues,
  mutation,
}) => {
  const { register, handleSubmit, errors, setValue } = useForm<IProfileInput>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { user } = useContext(AuthContext);

  const router = useRouter();
  const [showError, setShowError] = useState('');
  const [tags, setTags] = useState([]);

  const [profileImage, setProfileImage] = useImagePreview();
  const [coverImage, setCoverImage] = useImagePreview();

  const [handleProfileMutation] = useMutation(mutation, {
    onCompleted: () => router.push('/home'),
    onError: ({ graphQLErrors }) =>
      setShowError(graphQLErrors[0].extensions.errors),
  });

  const onSubmit = (data: IProfileInput) => {
    handleProfileMutation({
      variables: {
        profile: {
          ...data,
          avatar: profileImage.file,
          coverImage: coverImage.file,
          hashtags: tags,
        },
      },
    });
  };

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

      if (defaultValues.coverImage) {
        setOldCoverImage(
          process.env.NEXT_PUBLIC_API_HOST + defaultValues.coverImage,
        );

        setOldProfileImage(
          process.env.NEXT_PUBLIC_API_HOST + defaultValues.avatar,
        );
      }
    }
  }, [defaultValues, setTags, setValue]);

  return (
    <ThemeProvider theme={formTheme}>
      <FormProfileContainer onSubmit={handleSubmit(onSubmit)} className="forms">
        <div className="profile-image-cover">
          <ProfileImagePreview
            alt="Capa do perfil"
            olderImage={oldCoverImage}
            preview={coverImage.preview as string}
          >
            <div className="holder" />
          </ProfileImagePreview>
          <label htmlFor="uploadCoverButton">
            <div className="upload-cover">
              <MdEdit />
              Adicionar capa
            </div>
            <input
              accept="image/*"
              name="coverImage"
              id="uploadCoverButton"
              type="file"
              onChange={e => setCoverImage(e)}
            />
          </label>
        </div>
        <div className="profile-image-upload">
          <ProfileImagePreview
            alt="Imagem do perfil"
            olderImage={oldProfileImage}
            preview={profileImage.preview as string}
          >
            <div className="holder">
              <p>
                {user.username[0]}
                {user.username[1]}
              </p>
            </div>
          </ProfileImagePreview>

          <label htmlFor="uploadButton">
            <IconButton aria-label="upload picture" component="span">
              <MdEdit className="upload-icon" />
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
