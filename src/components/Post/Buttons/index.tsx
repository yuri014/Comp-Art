import React from 'react';
import { FaCommentAlt } from 'react-icons/fa';
import Link from 'next/link';

import { PostInteractionButtonsProps } from '@interfaces/InteractionButtons';
import InteractionButtonsContainer from './styles';
import LikeButton from './LikeButton';
import ShareButton from './ShareButton';
import SavedButton from './SavedButton';

const PostInteractionButtons: React.FC<PostInteractionButtonsProps> = ({
  dislikePost,
  likePost,
  postProps,
  updateLevel,
}) => (
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
    <SavedButton
      initialSaveState={postProps.isSaved}
      updateLevel={updateLevel}
      postID={postProps._id}
    />
  </InteractionButtonsContainer>
);

export default PostInteractionButtons;
