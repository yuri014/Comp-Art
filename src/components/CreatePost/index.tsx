import React, { useState } from 'react';
import { FaRegFileImage } from 'react-icons/fa';
import { IoMdClose, IoMdMusicalNote } from 'react-icons/io';

import usePreventMemoryLeak from '@hooks/preventMemoryLeak';
import useImageDimension from '@hooks/imageDimension';
import { IProfile } from '@interfaces/Profile';
import useImagePreview from '@hooks/imagePreview';
import { CREATE_POST } from '@graphql/mutations/post';
import { useMutation } from '@apollo/client';
import CreatePostContainer from './styles';
import DraftEditor from './DraftEditor';
import 'draft-js/dist/Draft.css';

interface CreatePostProps {
  getLoggedProfile: IProfile;
}

const CreatePost: React.FC<CreatePostProps> = ({ getLoggedProfile }) => {
  const isMount = usePreventMemoryLeak();
  const [description, setDescription] = useState('');

  const [imagePreview, setImagePreview] = useImagePreview();
  const [audioResult, setAudioResult] = useState<File>();
  const imageDimension = useImageDimension(imagePreview.preview);

  const [createPost] = useMutation(CREATE_POST, {
    onError: ({ graphQLErrors }) => console.log(graphQLErrors[0].message),
  });

  const onSubmit = () => {
    if (description.length >= 1200) {
      console.log('error');

      return;
    }

    createPost({
      variables: {
        post: {
          description,
          body: audioResult || imagePreview.file,
          alt: '',
          thumbnail: audioResult ? imagePreview.file : '',
        },
      },
    });
  };

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
          {imagePreview.preview && (
            <div className="media">
              <button type="button" onClick={() => setImagePreview('')}>
                <IoMdClose />
              </button>
              <img
                src={imagePreview.preview as string}
                alt="Imagem do perfil"
                style={{ objectFit: imageDimension }}
              />
            </div>
          )}
        </div>

        <div className="buttons">
          <div>
            <label htmlFor="uploadImage">
              <FaRegFileImage />
              <input
                accept="image/*"
                id="uploadImage"
                type="file"
                onChange={e => setImagePreview(e)}
              />
            </label>
            <label htmlFor="uploadAudio">
              <input
                accept="audio/*"
                id="uploadAudio"
                type="file"
                onChange={e => setAudioResult(e.target.files[0])}
              />
              <IoMdMusicalNote />
            </label>
          </div>
          <button type="submit" className="publish">
            Publicar
          </button>
        </div>
      </form>
    </CreatePostContainer>
  );
};

export default CreatePost;
