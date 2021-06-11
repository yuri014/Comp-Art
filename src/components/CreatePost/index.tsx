import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { FaRegFileImage } from 'react-icons/fa';
import { IoMdMusicalNote } from 'react-icons/io';
import { useMutation } from '@apollo/client';

import DraftEditor from '@components/DraftEditor';
import { CREATE_POST } from '@graphql/mutations/post';
import useImagePreview from '@hooks/imagePreview';
import useImageDimension from '@hooks/imageDimension';
import usePreventMemoryLeak from '@hooks/preventMemoryLeak';
import { IProfile } from '@interfaces/Profile';
import CreatePostContainer from './styles';

const MediaForm = dynamic(() => import('./utils/MediaForm'));
const DescriptionCounter = dynamic(
  () => import('@components/DraftEditor/utils/DescriptionCounter'),
);

const SendSuccess = dynamic(() =>
  import('./PostResponse').then(mod => mod.SendSuccess),
);

const SendError = dynamic(() =>
  import('./PostResponse').then(mod => mod.SendError),
);

interface CreatePostProps {
  getLoggedProfile: IProfile;
}

const CreatePost: React.FC<CreatePostProps> = ({ getLoggedProfile }) => {
  const isMount = usePreventMemoryLeak();

  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(0);
  const [canSubmit, setCanSubmit] = useState(true);
  const [showError, setShowError] = useState('');
  const [title, setTitle] = useState('');
  const [alt, setAlt] = useState('');
  const [showModal, setShowModal] = useState(false);

  const audioInput = useRef<HTMLInputElement | null>(null);
  const imageInput = useRef<HTMLInputElement | null>(null);

  const [imagePreview, setImagePreview] = useImagePreview();
  const [audioResult, setAudioResult] = useState<File>();
  const imageDimension = useImageDimension(imagePreview.preview);

  const [createPost] = useMutation(CREATE_POST, {
    onError: ({ graphQLErrors }) => setShowError(graphQLErrors[0].message),
    onCompleted: () => setShowModal(true),
  });

  const onSubmit = () => {
    createPost({
      variables: {
        post: {
          description,
          body: audioResult || imagePreview.file,
          alt,
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
          {isMount && (
            <DraftEditor
              setText={setDescription}
              setProgress={setProgress}
              limit={1200}
              placeholder="Digite aqui o seu post..."
            />
          )}
          {(imagePreview.preview || audioResult) && (
            <MediaForm
              audioResult={audioResult}
              cleaner={() => {
                setImagePreview('');
                setAudioResult(null);
              }}
              imageDimension={imageDimension}
              preview={imagePreview.preview as string}
              setAlt={setAlt}
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
          <div>
            {description.trim().length > 0 && (
              <DescriptionCounter progress={progress} />
            )}
            <button
              type="submit"
              disabled={!canSubmit}
              className={`${canSubmit ? '' : 'disabled'}`}
            >
              Publicar
            </button>
          </div>
        </div>
      </form>
      <SendSuccess setShowModal={setShowModal} showModal={showModal} />
      <SendError setShowError={setShowError} showError={showError} />
    </CreatePostContainer>
  );
};

export default CreatePost;
