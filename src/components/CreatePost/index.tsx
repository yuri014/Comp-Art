import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { FaRegFileImage, FaTimes } from 'react-icons/fa';
import { IoMdMusicalNote } from 'react-icons/io';
import { IconButton, Snackbar, ThemeProvider } from '@material-ui/core';

import usePreventMemoryLeak from '@hooks/preventMemoryLeak';
import useImageDimension from '@hooks/imageDimension';
import { IProfile } from '@interfaces/Profile';
import useImagePreview from '@hooks/imagePreview';
import { CREATE_POST } from '@graphql/mutations/post';
import { useMutation } from '@apollo/client';
import formTheme from '@styles/themes/FormTheme';
import CreatePostContainer from './styles';
import DraftEditor from './DraftEditor';
import 'draft-js/dist/Draft.css';

const MediaForm = dynamic(() => import('./utils/MediaForm'));

interface CreatePostProps {
  getLoggedProfile: IProfile;
}

const CreatePost: React.FC<CreatePostProps> = ({ getLoggedProfile }) => {
  const isMount = usePreventMemoryLeak();
  const [description, setDescription] = useState('');
  const [canSubmit, setCanSubmit] = useState(true);
  const [showError, setShowError] = useState('');
  const [title, setTitle] = useState('');
  const audioInput = useRef<HTMLInputElement | null>(null);
  const imageInput = useRef<HTMLInputElement | null>(null);

  const [imagePreview, setImagePreview] = useImagePreview();
  const [audioResult, setAudioResult] = useState<File>();
  const imageDimension = useImageDimension(imagePreview.preview);

  const [createPost] = useMutation(CREATE_POST, {
    onError: ({ graphQLErrors }) => setShowError(graphQLErrors[0].message),
  });

  const onSubmit = () => {
    createPost({
      variables: {
        post: {
          description,
          body: audioResult || imagePreview.file,
          alt: '',
          thumbnail: audioResult ? imagePreview.file : '',
          title,
        },
      },
    });
  };

  useEffect(() => {
    if (description.length >= 1200) {
      setCanSubmit(false);
    }
  }, [description]);

  return (
    <CreatePostContainer>
      <img
        src={process.env.NEXT_PUBLIC_API_HOST + getLoggedProfile.avatar}
        alt={`${getLoggedProfile.name} avatar`}
      />
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="editor">
          {isMount && <DraftEditor setDescription={setDescription} />}
          {(imagePreview.preview || audioResult) && (
            <MediaForm
              audioResult={audioResult}
              imageDimension={imageDimension}
              preview={imagePreview.preview as string}
              cleaner={() => {
                setImagePreview('');
                setAudioResult(null);
              }}
              setTitle={setTitle}
            />
          )}
        </div>

        <div className="buttons">
          <div>
            <button
              className="icon-button"
              type="button"
              onClick={() => imageInput.current.click()}
              aria-label="Adicionar imagens"
            >
              <FaRegFileImage />
            </button>
            <input
              accept="image/*"
              id="uploadImage"
              type="file"
              onChange={e => setImagePreview(e)}
              ref={imageInput}
            />

            <button
              className="icon-button"
              type="button"
              onClick={() => audioInput.current.click()}
              aria-label="Adicionar vídeos"
            >
              <IoMdMusicalNote />
            </button>
            <input
              accept="audio/*"
              id="uploadAudio"
              type="file"
              onChange={e => setAudioResult(e.target.files[0])}
              ref={audioInput}
            />
          </div>
          <button
            type="submit"
            disabled={!canSubmit}
            className={`${canSubmit ? '' : 'disabled'}`}
          >
            Publicar
          </button>
        </div>
      </form>
      <ThemeProvider theme={formTheme}>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={!!showError}
          autoHideDuration={3000}
          onClose={() => setShowError('')}
          message={showError}
          action={
            <IconButton
              size="small"
              aria-label="fechar menu erro"
              onClick={() => setShowError('')}
            >
              <FaTimes />
            </IconButton>
          }
        />
      </ThemeProvider>
    </CreatePostContainer>
  );
};

export default CreatePost;
