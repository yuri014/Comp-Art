import React, { useEffect, useState } from 'react';
import { FaRegBookmark, FaCommentAlt, FaBookmark } from 'react-icons/fa';
import Link from 'next/link';
import { gql, useMutation } from '@apollo/client';

import { PostInteractionButtonsProps } from '@interfaces/InteractionButtons';
import InteractionButtonsContainer from './styles';
import LikeButton from './LikeButton';
import ShareButton from './ShareButton';

const SAVE_POST = gql`
  mutation AddSavedPost($id: ID!) {
    addSavedPost(postID: $id)
  }
`;

const PostInteractionButtons: React.FC<PostInteractionButtonsProps> = ({
  dislikePost,
  likePost,
  postProps,
  updateLevel,
}) => {
  const [isSaved, setIsSaved] = useState<boolean>();
  const [savePost] = useMutation(SAVE_POST, {
    onCompleted: () => updateLevel(),
  });

  useEffect(() => {
    setIsSaved(postProps.isSaved);
  }, [postProps.isSaved]);

  return (
    <InteractionButtonsContainer>
      <div className="interaction-group prevent-redirect-post">
        <LikeButton
          dislikePost={dislikePost}
          likePost={likePost}
          initialLikeState={postProps.isLiked}
        />
        <Link href={`/post/${postProps._id}`}>
          <a aria-label="Comentar" className="prevent-redirect-post">
            <div className="interactions-button prevent-redirect-post">
              <FaCommentAlt size={20} />{' '}
              <p className="prevent-redirect-post">Comentar</p>
            </div>
          </a>
        </Link>
        <ShareButton postID={postProps._id} updateLevel={updateLevel} />
      </div>
      <button
        className="bookmark prevent-redirect-post"
        aria-label="Salvar"
        type="button"
        onClick={() => {
          setIsSaved(!isSaved);
          savePost({ variables: { id: postProps._id } });
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
    </InteractionButtonsContainer>
  );
};

export default PostInteractionButtons;
