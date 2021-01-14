import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { IconButton, NoSsr, TextField, ThemeProvider } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { FaCameraRetro } from 'react-icons/fa';

import RegisterProfileContainer from '../../styles/pages/register-profile/styles';
import formTheme from '../../styles/themes/FormTheme';
import PressStartButton from '../../components/PressStartButton';
import { IProfileInput } from '../../interfaces/Profile';
import REGISTER_ARTIST_PROFILE from '../../graphql/mutations/profile';

interface ImagePreview {
  preview: string | ArrayBuffer;
  file: string | File;
}
interface ImageState {
  profile: ImagePreview;
  cover: ImagePreview;
}

const RegisterProfile: React.FC = () => {
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

  const [createProfile] = useMutation(REGISTER_ARTIST_PROFILE);

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
              <img src={imagePreview.cover.preview as string} alt="cover" />
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
              <img src={imagePreview.profile.preview as string} alt="profile" />
            ) : (
              <img
                src="https://images.pexels.com/photos/3981624/pexels-photo-3981624.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="profile"
              />
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
              />
            </NoSsr>
            <PressStartButton type="submit">Start</PressStartButton>
          </div>
        </form>
      </ThemeProvider>
    </RegisterProfileContainer>
  );
};

export default RegisterProfile;
