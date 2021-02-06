import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { InputAdornment, TextField, ThemeProvider } from '@material-ui/core';
import { FiFileText } from 'react-icons/fi';
import { useRouter } from 'next/router';

import CREATE_POST from '../../graphql/mutations/post';
import { CreatePostContainer } from './styles';
import PressStartButtonContainer from '../PressStartButton/styles';
import formTheme from '../../styles/themes/FormTheme';
import ErrorMessage from '../ErrorMessage';

interface IPostInput {
  description: string;
}

const CreateAudioPost: React.FC = () => {
  const { register, errors, handleSubmit } = useForm<IPostInput>();
  const [showError, setShowError] = useState('');
  const [audioResult, setAudioResult] = useState<File>();
  const router = useRouter();

  const [createPost] = useMutation(CREATE_POST, {
    onCompleted: () => router.push('/home'),
    onError: ({ graphQLErrors }) =>
      setShowError(
        graphQLErrors[0].extensions.errors || graphQLErrors[0].message,
      ),
  });

  const onSubmit = ({ description }: IPostInput) => {
    createPost({
      variables: {
        post: {
          description,
          body: audioResult,
          isAudio: true,
        },
      },
    });
  };

  return (
    <CreatePostContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Crie seu post!</h2>
        <ThemeProvider theme={formTheme}>
          <TextField
            fullWidth
            name="description"
            label="Título"
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
          <label className="file-label" htmlFor="uploadAudio">
            <input
              accept="audio/*"
              id="uploadAudio"
              type="file"
              onChange={e => setAudioResult(e.target.files[0])}
              required
            />

            <div className="drop-file">
              <p>
                {audioResult
                  ? audioResult.name
                  : 'Clique ou arraste seu áudio.'}
              </p>
            </div>
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

export default CreateAudioPost;
