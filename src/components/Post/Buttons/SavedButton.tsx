import React, { useEffect, useState } from 'react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { gql, useMutation } from '@apollo/client';

import { SavedButtonProps } from '@interfaces/InteractionButtons';

const SAVE_POST = gql`
  mutation AddSavedPost($id: ID!) {
    addSavedPost(postID: $id)
  }
`;

const DELETE_POST = gql`
  mutation DeleteSavedPost($id: ID!) {
    deleteSavedPost(postID: $id)
  }
`;

const SavedButton: React.FC<SavedButtonProps> = ({
  initialSaveState,
  postID,
}) => {
  const [isSaved, setIsSaved] = useState<boolean>();
  const [savePost] = useMutation(SAVE_POST);
  const [deletePost] = useMutation(DELETE_POST);

  useEffect(() => {
    setIsSaved(initialSaveState);
  }, [initialSaveState]);

  return (
    <button
      className="bookmark prevent-redirect-post"
      aria-label="Salvar"
      type="button"
      onClick={() => {
        if (isSaved) {
          setIsSaved(false);
          deletePost({ variables: { id: postID } });
        } else {
          setIsSaved(true);
          savePost({ variables: { id: postID } });
        }
      }}
    >
      {isSaved ? (
        <div className="interactions-button prevent-redirect-post">
          <FaBookmark size={20} /> <p>Salvo</p>
        </div>
      ) : (
        <div className="interactions-button prevent-redirect-post">
          <FaRegBookmark size={20} /> <p>Salvar</p>
        </div>
      )}
    </button>
  );
};

export default React.memo(SavedButton);
