import React, { useEffect, useState } from 'react';
import { FaRegFileImage } from 'react-icons/fa';
import { IoMdClose, IoMdMusicalNote } from 'react-icons/io';

import usePreventMemoryLeak from '@hooks/preventMemoryLeak';
import { IProfile } from '@interfaces/Profile';
import useImagePreview from '@hooks/imagePreview';
import CreatePostContainer from './styles';
import DraftEditor from './DraftEditor';
import 'draft-js/dist/Draft.css';

interface CreatePostProps {
  getLoggedProfile: IProfile;
}

const CreatePost: React.FC<CreatePostProps> = ({ getLoggedProfile }) => {
  const isMount = usePreventMemoryLeak();

  const [imagePreview, setImagePreview] = useImagePreview();
  const [audioResult, setAudioResult] = useState<File>();
  const [imageDimension, setImageDimenstion] = useState<'cover' | 'contain'>(
    'cover',
  );

  const onSubmit = () => {
    console.log({
      description: '',
      body: audioResult || imagePreview.file,
      alt: '',
      thumbnail: audioResult ? imagePreview.file : '',
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
          {isMount && <DraftEditor />}
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
