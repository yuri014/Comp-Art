import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useMutation } from '@apollo/client';
import { NoSsr } from '@material-ui/core';

import DraftEditor from '@components/DraftEditor';
import { CREATE_POST } from '@graphql/mutations/post';
import { GET_POSTS, GET_PROFILE_POSTS_AND_SHARES } from '@graphql/queries/post';
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

const PostResponse = dynamic(() => import('./utils/PostResponse'));

const ErrorResponse = dynamic(() => import('./ErrorResponse'));

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
  const [isBlocked, setIsBlocked] = useState(false);

  const [imagePreview, setImagePreview] = useImagePreview();
  const [audioResult, setAudioResult] = useState<File>();
  const imageDimension = useImageDimension(imagePreview.preview);

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    onError: ({ graphQLErrors }) => {
      if (graphQLErrors[0].extensions.isBlocked) {
        setShowModal(true);
        setIsBlocked(true);
      } else {
        setShowError(graphQLErrors[0].message);
      }
    },
    onCompleted: () => setShowModal(true),
    refetchQueries: [
      {
        query: GET_PROFILE_POSTS_AND_SHARES,
        variables: {
          offset: [0, 0],
          username: getLoggedProfile.owner,
        },
      },
      {
        query: GET_POSTS,
        variables: {
          offset: [0, 0],
        },
      },
    ],
  });

  const cleaner = () => {
    setImagePreview('');
    setAudioResult(null);
  };

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

    cleaner();
  };

  const hasMedia = !!audioResult || !!imagePreview.file;
  const hasDescription = description.length > 0 && description.length <= 5000;
  const canSubmit = hasMedia || hasDescription;

  return (
    <NoSsr>
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
                cleaner={cleaner}
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
              {!loading ? (
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`${canSubmit ? '' : 'disabled'}`}
                >
                  Publicar
                </button>
              ) : (
                <button type="submit" disabled className="disabled">
                  Publicando...
                </button>
              )}
            </div>
          </div>
        </form>
        {showModal && (
          <PostResponse setShowModal={setShowModal} isBlocked={isBlocked} />
        )}
        {showError && (
          <ErrorResponse setShowError={setShowError} showError={showError} />
        )}
      </CreatePostContainer>
    </NoSsr>
  );
};

export default React.memo(CreatePost);
