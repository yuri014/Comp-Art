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
      levelContext.updateLevel();
    },
    () => {
      setIsLiked(true);
      setLikesCount(likesCount + 1);
      levelContext.updateLevel();
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

                <Link href={`/profile/${post.artist.username}`}>
                  <a>
                    <div>
                      <h4>{post.artist.name}</h4>
                      <span>
                        <p>@{post.artist.username}</p>
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
                  username={post.artist.username}
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
              <div className="post-interaction">
                <Button
                  className={isLiked ? 'active' : ''}
                  type="button"
                  onClick={() => (isLiked ? dislikePost() : likePost())}
                  title="Curtir"
                >
                  {isLiked ? <FaHeart /> : <FaRegHeart />}
                  <p>{likesCount}</p>
                </Button>
                <Button title="Comentar" type="button">
                  <FaRegComment />
                  <p>{post.commentsCount}</p>
                </Button>
                <Button title="Compartilhar" type="button">
                  <FaRegShareSquare />
                  <p>{post.sharedCount}</p>
                </Button>
              </div>
            </div>
          </ThemeProvider>
          {isImageFullScreen && (
            <FullScreenImage
              img={post.body}
              onClose={() => setIsImageFullScreen(false)}
            />
          )}
        </PostContainer>
      )}
    </>
  );
};

export default React.memo(ImagePost);
