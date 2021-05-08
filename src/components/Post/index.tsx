import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import { PostProps } from '../../interfaces/Post';
import AudioPost from './AudioPost';
import ImagePost from './ImagePost';

import useDeletePost from '../../hooks/posts';
import LevelContext from '../../context/level';
import PostContainer from './styles';
import formatDate from '../../utils/formatDate';
import ModalLikesButton from '../Splitter/ModalLikesButton';
import { GET_LIKES } from '../../graphql/mutations/post';
import PostInteractionButtons from './Buttons';

const OptionsMenu = dynamic(() => import('./OptionsMenu'));
const ModalProfile = dynamic(() => import('../ModalProfile'));

const Post: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState<boolean>();
  const [likesCount, setLikesCount] = useState<number>();
  const [isDeleted, setIsDeleted] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    setIsLiked(post.isLiked);
    setLikesCount(post.likesCount);
  }, [post.isLiked, post.likesCount]);

  const levelContext = useContext(LevelContext);

  const [deletePost, dislikePost, likePost] = useDeletePost(
    post._id,
    () => {
      setIsLiked(false);
      setLikesCount(likesCount - 1);
      if (levelContext) {
        levelContext.updateLevel();
      }
    },
    () => {
      setIsLiked(true);
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

  const publishDate = () => {
    const date = formatDate(post.createdAt);
    const hour = new Date(post.createdAt).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return `${date} · ${hour}h`;
  };

  return (
    <>
      {!isDeleted && (
        <PostContainer>
          <div className="post-author">
            <div className="author-info">
              <img
                alt={`Imagem de perfil de ${post.artist.name}`}
                src={process.env.NEXT_PUBLIC_API_HOST + post.artist.avatar}
              />
              <Link href={`/profile/${post.artist.owner}`}>
                <a>
                  <div>
                    <p>{post.artist.name}</p>
                    <span>
                      <p>@{post.artist.owner}</p>
                    </span>
                  </div>
                </a>
              </Link>
            </div>
            <div>
              <OptionsMenu
                deletePost={handleDeletePost}
                id={post._id}
                username={post.artist.owner}
              />
            </div>
          </div>
          <div className="post">
            <div className="post-description">
              <p>{post.description}</p>
            </div>
            {post.mediaId === 2 ? (
              <AudioPost post={post} />
            ) : (
              <ImagePost image={post.body} />
            )}
            <div className="post-info">
              <div className="post-counts">
                <ModalLikesButton
                  showModal={() => setModalShow(true)}
                  post={post}
                  likesCount={likesCount}
                />
                {post.commentsCount > 0 && (
                  <p>{post.commentsCount} comentários</p>
                )}
                {post.sharedCount > 0 && (
                  <p className="share-count">
                    {post.sharedCount} compartilhamentos
                  </p>
                )}
              </div>
              <div className="publish-date">
                {post.sharedCount > 0 && (
                  <p className="share-count-mobile">
                    {post.sharedCount} compartilhamentos
                  </p>
                )}
                <p>{publishDate()}</p>
              </div>
            </div>
            <PostInteractionButtons
              dislikePost={dislikePost}
              isLiked={isLiked}
              likePost={likePost}
              postID={post._id}
            />
          </div>
        </PostContainer>
      )}
      {modalShow && (
        <ModalProfile
          onHide={() => setModalShow(false)}
          queryResult="getLikes"
          query={GET_LIKES}
          id={post._id}
        />
      )}
    </>
  );
};

export default React.memo(Post);
