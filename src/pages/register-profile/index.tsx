import React, { useState } from 'react';
import { IconButton, NoSsr, TextField, ThemeProvider } from '@material-ui/core';
import { FaCameraRetro } from 'react-icons/fa';

import RegisterProfileContainer from '../../styles/pages/register-profile/styles';
import formTheme from '../../styles/themes/FormTheme';

interface ImagePreview {
  profile: string | ArrayBuffer;
  cover: string | ArrayBuffer;
}

const RegisterProfile: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<ImagePreview>({
    profile: '',
    cover: '',
  });

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    profile: boolean,
  ) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      if (profile) {
        setImagePreview({ ...imagePreview, profile: reader.result });
      } else {
        setImagePreview({ ...imagePreview, cover: reader.result });
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <RegisterProfileContainer>
      <div id="register-profile-title" className="main-title">
        <h1>Crie seu perfil!</h1>
      </div>
      <ThemeProvider theme={formTheme}>
        <form>
          <div className="profile-image-cover">
            {imagePreview.cover ? (
              <img src={imagePreview.cover as string} alt="cover" />
            ) : (
              <div className="holder" />
            )}
            <label htmlFor="uploadCoverButton">
              <IconButton aria-label="upload picture" component="span">
                <FaCameraRetro className="upload-icon" />
                <input
                  accept="image/*"
                  name="uploadCoverButton"
                  id="uploadCoverButton"
                  type="file"
                  onChange={e => handleImage(e, false)}
                />
              </IconButton>
            </label>
          </div>
          <div className="profile-image-upload">
            {imagePreview.profile ? (
              <img src={imagePreview.profile as string} alt="profile" />
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
                  name="uploadButton"
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
                placeholder="Sua bio..."
                label="Bio"
                variant="outlined"
                multiline
                rows={2}
                rowsMax={4}
              />
            </NoSsr>
          </div>
        </form>
      </ThemeProvider>
    </RegisterProfileContainer>
  );
};

export default RegisterProfile;
