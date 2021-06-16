import React, { useCallback, useContext, useEffect, useState } from 'react';

import { LevelContext } from '@context/level';
import { PostProps } from '@interfaces/Post';
import usePostAsLink from '@hooks/postAsLink';
import TextBox from '@components/TextBox';
import { UseInteractionsMutation } from '@interfaces/Hooks';
import PostInteractionButtons from './Buttons';
import PostContainer from './styles';
import AuthorInfo from './utils/AuthorInfo';
import InteractionsNumbers from './utils/InteractionsNumbers';

interface IPostProps extends PostProps {
  children: React.ReactNode;
  useInteractions: UseInteractionsMutation;
}

const Post: React.FC<IPostProps> = ({ post, children, useInteractions }) => {
  const [likesCount, setLikesCount] = useState<number>();
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    setLikesCount(post.likesCount);
  }, [post.likesCount]);

  const levelContext = useContext(LevelContext);

  const [deletePost, dislikePost, likePost] = useInteractions(
    post._id,
    () => {
      setLikesCount(likesCount - 1);
      if (levelContext) {
        levelContext.updateLevel();
      }
    },
    () => {
      setLikesCount(likesCount + 1);
      if (levelContext) {
        levelContext.updateLevel();
      }
    },
  );

  const handleDeletePost = useCallback(() => {
    deletePost();
    setIsDeleted(true);
  }, [deletePost]);

  const handlePostLink = usePostAsLink(post._id);

  const profileData = post.post ? post.profile : post.artist;

  return (
    <>
      {!isDeleted && (
        <PostContainer
          role="button"
          tabIndex={0}
          onMouseDown={e => handlePostLink(e)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handlePostLink(e);
            }
          }}
        >
          <div className="post-author">
            <AuthorInfo
              createdAt={post.createdAt}
              handleDeletePost={handleDeletePost}
              postID={post._id}
              profile={profileData}
            />
          </div>
          <div className="post">
            {post.description && (
              <div className="post-description">
                <TextBox text={post.description} />
              </div>
            )}
            {children}
            <div className="post-info">
              <InteractionsNumbers post={post} likesCount={likesCount} />
            </div>
            <PostInteractionButtons
              dislikePost={dislikePost}
              likePost={likePost}
              postProps={{
                _id: post._id,
                isLiked: post.isLiked,
                isSaved: post.isSaved,
              }}
              updateLevel={levelContext && levelContext.updateLevel}
            />
          </div>
        </PostContainer>
      )}
    </>
  );
};

export default React.memo(Post);
