import React, { useEffect, useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import { FaRegFileImage } from 'react-icons/fa';
import { IoMdClose, IoMdMusicalNote } from 'react-icons/io';
import Editor from '@draft-js-plugins/editor';

import { IProfile } from '@interfaces/Profile';
import useImagePreview from '@hooks/imagePreview';
import plugins from './utils/plugins';
import CreatePostContainer from './styles';
import 'draft-js/dist/Draft.css';

interface CreatePostProps {
  getLoggedProfile: IProfile;
}

const CreatePost: React.FC<CreatePostProps> = ({ getLoggedProfile }) => {
  const emptyEditor = () => EditorState.createEmpty();
  const [editorState, setEditorState] = useState(emptyEditor());

  const { blocks } = convertToRaw(editorState.getCurrentContent());
  const description = blocks
    .map(block => (!block.text.trim() && '\n') || block.text)
    .join('\n');

  const [imagePreview, setImagePreview] = useImagePreview();
  const [imageDimension, setImageDimenstion] = useState<'cover' | 'contain'>(
    'cover',
  );

  const onSubmit = () => {
    console.log({
      description,
      body: imagePreview.file,
      alt: '',
      thumbnail: '',
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
          <Editor
            editorState={editorState}
            placeholder="Digite aqui seu post..."
            onChange={setEditorState}
            plugins={plugins}
          />
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
                onChange={e => console.log(e.target.files[0])}
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
