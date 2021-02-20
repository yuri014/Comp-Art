import React, { useContext, useEffect, useState } from 'react';
import { Button, ThemeProvider } from '@material-ui/core';
import Link from 'next/link';
import {
  FaHeart,
  FaRegComment,
  FaRegHeart,
  FaRegShareSquare,
} from 'react-icons/fa';
import dynamic from 'next/dynamic';

import { PostContainer } from './styles';
import { PostProps } from '../../interfaces/Post';
import mainTheme from '../../styles/themes/MainTheme';
import useDeletePost from '../../hooks/posts';
import LevelContext from '../../context/level';

const FullScreenImage = dynamic(() => import('../FullScreenImage'));
const OptionsMenu = dynamic(() => import('./OptionsMenu'));

const ImagePost: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState<boolean>();
  const [likesCount, setLikesCount] = useState<number>();
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

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

  return (
    <>
      {!isDeleted && (
        <PostContainer>
          <ThemeProvider theme={mainTheme}>
            <div className="post-author">
              <div className="author-info">
                <img
                  alt={`Imagem de perfil de ${post.artist.name}`}
                  src={post.avatar || '/profile.jpg'}
                />

                <Link href={`/profile/${post.artist.owner}`}>
                  <a>
                    <div>
                      <h4>{post.artist.name}</h4>
                      <span>
                        <p>@{post.artist.owner}</p>
                        <p>&nbsp;●&nbsp;</p>
                        <p>
                          {new Date(post.createdAt).toLocaleDateString('en-GB')}
                        </p>
                      </span>
                    </div>
                  </a>
                </Link>
              </div>
              <div className="post-config">
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
              <div
                onClick={() => setIsImageFullScreen(true)}
                onKeyDown={() => setIsImageFullScreen(true)}
                onBlur={() => setIsImageFullScreen(false)}
                role="button"
                tabIndex={0}
              >
                <figure className="post-image">
                  <img src={post.body} alt="Publicação" />
                </figure>
              </div>
              <div className="post-counts">
                <button type="button">
                  <div className="likes-images">
                    {post.likes.map(like => (
                      <img
                        src={like.avatar || '/profile.jpg'}
                        alt={like.username}
                        title={like.username}
                      />
                    ))}
                  </div>
                  {likesCount > 0 && (
                    <>
                      {likesCount} {likesCount > 1 ? 'curtidas' : 'curtida'}
                    </>
                  )}
                </button>
              </div>
              <div className="post-interaction">
                <Button
                  className={isLiked ? 'active' : ''}
                  type="button"
                  onClick={() => (isLiked ? dislikePost() : likePost())}
                  title="Curtir"
                >
                  {isLiked ? <FaHeart /> : <FaRegHeart />}
                </Button>
                <Link href={`/post/${post._id}`}>
                  <a>
                    <Button title="Comentar" type="button">
                      <FaRegComment />
                    </Button>
                  </a>
                </Link>
                <Button title="Compartilhar" type="button">
                  <FaRegShareSquare />
                </Button>
              </div>
            </div>
            {isImageFullScreen && (
              <FullScreenImage
                img={post.body}
                onClose={() => setIsImageFullScreen(false)}
              />
            )}
          </ThemeProvider>
        </PostContainer>
      )}
    </>
  );
};

export default React.memo(ImagePost);
