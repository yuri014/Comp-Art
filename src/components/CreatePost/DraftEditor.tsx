import React, { useState } from 'react';
import Editor from '@draft-js-plugins/editor';
import { convertToRaw, EditorState } from 'draft-js';
import { CircularProgress } from '@material-ui/core';

import getValueForProgress from './utils/counter';
import { CharCounter, plugins } from './utils/plugins';

type Answer = string | number;

const DraftEditor: React.FC = () => {
  const emptyEditor = () => EditorState.createEmpty();
  const [editorState, setEditorState] = useState(emptyEditor());
  const currentEditorState = editorState.getCurrentContent();
  const editorCharactersCount = currentEditorState.getPlainText().length;

  const progress = getValueForProgress(editorCharactersCount);
  const checkProgress = (answerOne: Answer, anwserTwo: Answer) => {
    if (progress >= 100) {
      return answerOne;
    }
    return anwserTwo;
  };

  const { blocks } = convertToRaw(editorState.getCurrentContent());
  const description = blocks
    .map(block => (!block.text.trim() && '\n') || block.text)
    .join('\n');

  return (
    <>
      <Editor
        editorState={editorState}
        placeholder="Digite aqui seu post..."
        onChange={setEditorState}
        plugins={plugins}
      />

      <div className="counter-container">
        <CharCounter limit={12} />

        <CircularProgress
          className="background-circle"
          variant="determinate"
          size="2rem"
          style={{ color: '#ccc' }}
          value={100}
        />
        <CircularProgress
          variant="determinate"
          size="2rem"
          style={{ color: `${checkProgress('#FF3838', '#1cc5b7')}` }}
          value={checkProgress(100, progress) as number}
        />
      </div>
    </>
  );
};

export default DraftEditor;
