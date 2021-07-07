import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useMutation } from '@apollo/client';

import DraftEditor from '@components/DraftEditor';
import { CREATE_POST } from '@graphql/mutations/post';
import useImagePreview from '@hooks/imagePreview';
import useImageDimension from '@hooks/imageDimension';
import usePreventMemoryLeak from '@hooks/preventMemoryLeak';
import { IProfile } from '@interfaces/Profile';
import ProfileImage from '@components/ProfileImage';
import CreatePostContainer from './styles';
import InputFileButtons from './utils/InputButton';

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
  const [showError, setShowError] = useState('');
  const [title, setTitle] = useState('');
  const [alt, setAlt] = useState('');
  const [showModal, setShowModal] = useState(false);

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

  const hasMedia = !!audioResult || !!imagePreview.file;
  const hasDescription = description.length > 0 && description.length <= 1200;
  const canSubmit = hasMedia || hasDescription;

  return (
    <CreatePostContainer>
      <ProfileImage
        alt={`${getLoggedProfile.name} avatar`}
        avatar={getLoggedProfile.avatar}
        username={getLoggedProfile.owner}
        className="profile-image"
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
              limit={5000}
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
          <InputFileButtons
            setAudioResult={setAudioResult}
            setImagePreview={setImagePreview}
          />
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
      {showModal && <SendSuccess setShowModal={setShowModal} />}
      {showError && (
        <SendError setShowError={setShowError} showError={showError} />
      )}
    </CreatePostContainer>
  );
};

export default React.memo(CreatePost);
