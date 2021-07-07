import React, { useState } from 'react';

import DraftEditor from '@components/DraftEditor';
import DescriptionCounter from '@components/DraftEditor/utils/DescriptionCounter';
import usePreventMemoryLeak from '@hooks/preventMemoryLeak';
import CAButton from '@styles/components/button';
import { ModalShareContainer } from './styles';

interface ModalShareDescriptionProps {
  sharePost: (description?: string) => void;
}

const ModalShareDescription: React.FC<ModalShareDescriptionProps> = ({
  sharePost,
}) => {
  const isMount = usePreventMemoryLeak();

  const [commentField, setCommentField] = useState('');
  const [progress, setProgress] = useState(0);

  return (
    <>
      {isMount && (
        <ModalShareContainer className="modal-content">
          <div className="input-container">
            <div className="draft-container">
              <DraftEditor
                setText={setCommentField}
                setProgress={setProgress}
                limit={255}
                placeholder="Digite aqui o seu comentário..."
              />
            </div>
            <DescriptionCounter
              className="counter-container"
              progress={progress}
              charCounterWithoutSpace={commentField.split(' ').join('').length}
            />
          </div>
          <CAButton onClick={() => sharePost(commentField)} type="button">
            Compartilhar
          </CAButton>
        </ModalShareContainer>
      )}
    </>
  );
};

export default ModalShareDescription;
