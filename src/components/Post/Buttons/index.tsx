import React from 'react';
import { FaCommentAlt } from 'react-icons/fa';
import Link from 'next/link';

import { PostInteractionButtonsProps } from '@interfaces/InteractionButtons';
import InteractionButtonsContainer from './styles';
import LikeButton from './LikeButton';
import ShareButton from './ShareButton';
import SavedButton from './SavedButton';

const CommentButton: React.FC<{ id: string }> = React.memo(({ id }) => (
  <Link href={`/post/${id}`}>
    <a aria-label="Comentar" className="prevent-redirect-post">
      <div className="interactions-button prevent-redirect-post">
        <FaCommentAlt size={20} />{' '}
        <p className="prevent-redirect-post">Comentar</p>
      </div>
    </a>
  </Link>
));

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
      {!postProps.isShare && <CommentButton id={postProps._id} />}
      <ShareButton postID={postProps._id} updateLevel={updateLevel} />
    </div>
    <SavedButton initialSaveState={postProps.isSaved} postID={postProps._id} />
  </InteractionButtonsContainer>
);

export default React.memo(PostInteractionButtons);
