import React, { useEffect, useState } from 'react';
import { InputAdornment, TextField, ThemeProvider } from '@material-ui/core';
import { FiFileText } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { CreatePostContainer } from './styles';
import formTheme from '../../styles/themes/FormTheme';
import useImagePreview from '../../hooks/imagePreview';
import PressStartButtonContainer from '../PressStartButton/styles';
import CREATE_POST from '../../graphql/mutations/post';
import ErrorMessage from '../ErrorMessage';

interface IPostInput {
  description: string;
}

const CreatePost: React.FC = () => {
  const router = useRouter();
  const [showError, setShowError] = useState('');
  const [imagePreview, setImagePreview] = useImagePreview();
  const [imageDimension, setImageDimenstion] = useState<'cover' | 'contain'>(
    'cover',
  );

  const { register, errors, handleSubmit } = useForm<IPostInput>();

  const [createPost] = useMutation(CREATE_POST, {
    onCompleted: () => router.push('/home'),
    onError: ({ graphQLErrors }) =>
      setShowError(graphQLErrors[0].extensions.errors),
  });

  const onSubmit = ({ description }: IPostInput) => {
    createPost({
      variables: {
        post: {
          description,
          body: imagePreview.file,
        },
      },
    });
  };

  useEffect(() => {
    const img = new Image();
    img.src = imagePreview.preview as string;
    img.onload = () => {
      if (img.naturalWidth / 2 > img.naturalHeight) {
        setImageDimenstion('contain');
      } else {
        setImageDimenstion('cover');
      }
    };
  }, [imagePreview]);

  return (
    <CreatePostContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Crie seu post!</h2>
        <ThemeProvider theme={formTheme}>
          <TextField
            fullWidth
            name="description"
            label="Description"
            id="description"
            error={!!errors.description}
            helperText="Máximo de 255 caracteres"
            inputRef={register({
              maxLength: 255,
              required: false,
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  style={{ alignSelf: 'stretch', marginTop: '9px' }}
                >
                  <FiFileText />
                </InputAdornment>
              ),
            }}
            multiline
          />
          <label className="image-label" htmlFor="uploadImage">
            <input
              accept="image/*"
              id="uploadImage"
              type="file"
              onChange={e => setImagePreview(e)}
              required
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
          {showError && (
            <div style={{ marginTop: '2rem' }}>
              <ErrorMessage>{showError}</ErrorMessage>
            </div>
          )}
          <div className="publish">
            <PressStartButtonContainer type="submit" role="button">
              <p>Publicar</p>
            </PressStartButtonContainer>
          </div>
        </ThemeProvider>
      </form>
    </CreatePostContainer>
  );
};

export default CreatePost;
