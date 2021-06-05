import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import ModalLikesButton from '@components/Splitter/ModalLikesButton';
import LevelContext from '@context/level';
import { GET_LIKES, GET_WHO_SHARE_POST } from '@graphql/queries/post';
import { PostProps } from '@interfaces/Post';
import publishDate from '@utils/publishDate';
import usePostAsLink from '@hooks/postAsLink';
import TextBox from '@components/TextBox';
import { UseInteractionsMutation } from '@interfaces/Hooks';
import PostInteractionButtons from './Buttons';
import PostContainer from './styles';
import AuthorInfo from './utils/AuthorInfo';

const ModalProfile = dynamic(() => import('../ModalProfile'));

interface IPostProps extends PostProps {
  children: React.ReactNode;
  useInteractions: UseInteractionsMutation;
}

const initialQuery = {
  queryResult: 'getLikes',
  query: GET_LIKES,
};

const Post: React.FC<IPostProps> = ({ post, children, useInteractions }) => {
  const [likesCount, setLikesCount] = useState<number>();
  const [isDeleted, setIsDeleted] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalPayload, setModalPayload] = useState(initialQuery);

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

  const handleDeletePost = () => {
    deletePost();
    setIsDeleted(true);
  };

  const handlePostLink = usePostAsLink(post._id);

  const profileData = post.post ? post.profile : post.artist;

  const ShareButton = ({ className }: { className?: string }) => (
    <>
      {post.sharedCount > 0 && (
        <button
          type="button"
          onClick={() => {
            setModalShow(true);
            setModalPayload({
              queryResult: 'getWhoSharesPost',
              query: GET_WHO_SHARE_POST,
            });
          }}
          aria-label="Abrir modal de compartilhamentos"
          className={className}
        >
          <p>{post.sharedCount} compartilhamentos</p>
        </button>
      )}
    </>
  );

  ShareButton.defaultProps = {
    className: 'share-count',
  };

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
              <div className="post-counts">
                {post.likesCount > 0 && (
                  <ModalLikesButton
                    showModal={() => {
                      setModalShow(true);
                      setModalPayload(initialQuery);
                    }}
                    post={post}
                    likesCount={likesCount}
                  />
                )}
                {post.commentsCount > 0 && (
                  <p>{post.commentsCount} comentários</p>
                )}
                <ShareButton />
              </div>
              <div className="publish-date">
                <ShareButton className="share-count-mobile" />
                <p>{publishDate(post.createdAt)}</p>
              </div>
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
      {modalShow && (
        <ModalProfile
          onHide={() => setModalShow(false)}
          queryResult={modalPayload.queryResult}
          query={modalPayload.query}
          variable={{ id: post._id }}
        />
      )}
    </>
  );
};

export default React.memo(Post);
