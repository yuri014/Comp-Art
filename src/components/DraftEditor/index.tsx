import React, { useEffect, useState } from 'react';
import Editor from '@draft-js-plugins/editor';
import { convertToRaw, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

import getValueForProgress from './utils/counter';
import { usePlugins } from './utils/plugins';
import '@draft-js-plugins/mention/lib/plugin.css';

interface DraftEditorProps {
  setText: React.Dispatch<React.SetStateAction<string>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  placeholder: string;
  limit: number;
}

const DraftEditor: React.FC<DraftEditorProps> = ({
  limit,
  placeholder,
  setText,
  setProgress,
}) => {
  const emptyEditor = () => EditorState.createEmpty();
  const [editorState, setEditorState] = useState(emptyEditor());
  const currentEditorState = editorState.getCurrentContent();
  const editorCharactersCount = currentEditorState.getPlainText().length;

  const progress = getValueForProgress(editorCharactersCount, limit);

  useEffect(() => {
    setProgress(progress);
  }, [progress, setProgress]);

  const { blocks } = convertToRaw(editorState.getCurrentContent());
  const text = blocks
    .map(block => (!block.text.trim() && '\n') || block.text)
    .join('\n');

  useEffect(() => {
    setText(text.trim());
  }, [text, setText]);

  const { plugins } = usePlugins();

  return (
    <Editor
      editorState={editorState}
      placeholder={placeholder}
      onChange={setEditorState}
      plugins={plugins}
    />
  );
};

export default DraftEditor;
