import React, { useEffect, useState } from 'react';
import { InputAdornment, TextField, ThemeProvider } from '@material-ui/core';
import { FiFileText } from 'react-icons/fi';

import { CreatePostContainer } from './styles';
import formTheme from '../../styles/themes/FormTheme';
import useImagePreview from '../../hooks/imagePreview';

const CreatePost: React.FC = () => {
  const [imagePreview, setImagePreview] = useImagePreview();
  const [imageDimension, setImageDimenstion] = useState<'cover' | 'contain'>(
    'cover',
  );

  useEffect(() => {
    const img = new Image();
    img.src = imagePreview.preview as string;
    img.onload = () => {
      if (img.naturalHeight - img.naturalWidth < 0) {
        setImageDimenstion('contain');
      } else {
        setImageDimenstion('cover');
      }
    };
  }, [imagePreview]);

  return (
    <CreatePostContainer>
      <form>
        <ThemeProvider theme={formTheme}>
          <TextField
            fullWidth
            name="description"
            label="Description"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiFileText />
                </InputAdornment>
              ),
            }}
          />
          <label className="image-label" htmlFor="uploadImage">
            <input
              accept="image/*"
              name="avatar"
              id="uploadImage"
              type="file"
              onChange={e => setImagePreview(e)}
            />

            {imagePreview.preview ? (
              <img
                src={imagePreview.preview as string}
                alt="Imagem do perfil"
                style={{ objectFit: imageDimension }}
              />
            ) : (
              <div className="drop-image">
                <p>Clique ou arraste sua imagem.</p>
              </div>
            )}
          </label>
        </ThemeProvider>
      </form>
    </CreatePostContainer>
  );
};

export default CreatePost;
