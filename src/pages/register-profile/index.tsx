import React, { useState } from 'react';
import { IconButton, TextField, ThemeProvider } from '@material-ui/core';
import { FaCameraRetro } from 'react-icons/fa';

import RegisterProfileContainer from '../../styles/pages/register-profile/styles';
import formTheme from '../../styles/themes/FormTheme';

const RegisterProfile: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer>('');

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setImagePreview(reader.result);
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
          <div>
            <div className="profile-image-upload">
              {imagePreview ? (
                <img src={imagePreview as string} alt="profile" />
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
                    onChange={e => handleImage(e)}
                  />
                </IconButton>
              </label>
            </div>
            <br />
            <TextField
              fullWidth
              name="name"
              placeholder="Seu nome..."
              label="Nome"
              required
            />
            <br />
            <br />
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
          </div>
        </form>
      </ThemeProvider>
    </RegisterProfileContainer>
  );
};

export default RegisterProfile;
