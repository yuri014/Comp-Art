import React, { useEffect, useState } from 'react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { gql, useMutation } from '@apollo/client';

import { SavedButtonProps } from '@interfaces/InteractionButtons';

const SAVE_POST = gql`
  mutation AddSavedPost($id: ID!) {
    addSavedPost(postID: $id)
  }
`;

const SavedButton: React.FC<SavedButtonProps> = ({
  initialSaveState,
  postID,
  updateLevel,
}) => {
  const [isSaved, setIsSaved] = useState<boolean>();
  const [savePost] = useMutation(SAVE_POST, {
    onCompleted: () => updateLevel(),
  });

  useEffect(() => {
    setIsSaved(initialSaveState);
  }, [initialSaveState]);

  return (
    <button
      className="bookmark prevent-redirect-post"
      aria-label="Salvar"
      type="button"
      onClick={() => {
        setIsSaved(!isSaved);
        savePost({ variables: { id: postID } });
      }}
    >
      {isSaved ? (
        <div className="interactions-button prevent-redirect-post">
          <FaRegBookmark size={20} /> <p>Salvar</p>
        </div>
      ) : (
        <div className="interactions-button prevent-redirect-post">
          <FaBookmark size={20} /> <p>Salvo</p>
        </div>
      )}
    </button>
  );
};

export default SavedButton;
