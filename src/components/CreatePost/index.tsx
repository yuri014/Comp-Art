import React, { useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';

import { IProfile } from '@interfaces/Profile';
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
  const value = blocks
    .map(block => (!block.text.trim() && '\n') || block.text)
    .join('\n');

  return (
    <CreatePostContainer>
      <div className="editor">
        <img
          src={process.env.NEXT_PUBLIC_API_HOST + getLoggedProfile.avatar}
          alt={`${getLoggedProfile.name} avatar`}
        />
        <Editor
          editorState={editorState}
          placeholder="Digite aqui seu post..."
          onChange={setEditorState}
          plugins={plugins}
        />
      </div>
      <div className="buttons">blank</div>
    </CreatePostContainer>
  );
};

export default CreatePost;
