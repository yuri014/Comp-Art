import React, { useEffect, useState } from 'react';
import Editor from '@draft-js-plugins/editor';
import { convertToRaw, EditorState } from 'draft-js';

import getValueForProgress from './utils/counter';
import { usePlugins } from './utils/plugins';
import '@draft-js-plugins/mention/lib/plugin.css';

interface DraftEditorProps {
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

const DraftEditor: React.FC<DraftEditorProps> = ({
  setDescription,
  setProgress,
}) => {
  const emptyEditor = () => EditorState.createEmpty();
  const [editorState, setEditorState] = useState(emptyEditor());
  const currentEditorState = editorState.getCurrentContent();
  const editorCharactersCount = currentEditorState.getPlainText().length;

  const progress = getValueForProgress(editorCharactersCount);

  useEffect(() => {
    setProgress(progress);
  }, [progress, setProgress]);

  const { blocks } = convertToRaw(editorState.getCurrentContent());
  const description = blocks
    .map(block => (!block.text.trim() && '\n') || block.text)
    .join('\n');

  useEffect(() => {
    setDescription(description.trim());
  }, [description, setDescription]);

  const { plugins } = usePlugins();

  return (
    <>
      <Editor
        editorState={editorState}
        placeholder="Digite aqui seu post..."
        onChange={setEditorState}
        plugins={plugins}
      />
    </>
  );
};

export default DraftEditor;
