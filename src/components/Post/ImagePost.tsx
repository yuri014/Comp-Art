import React, { useContext, useEffect, useState } from 'react';
import { IconButton, ThemeProvider } from '@material-ui/core';
import Link from 'next/link';
import {
  FaHeart,
  FaRegBookmark,
  FaCommentAlt,
  FaRegHeart,
  FaShareAlt,
} from 'react-icons/fa';
import dynamic from 'next/dynamic';

import { PostProps } from '../../interfaces/Post';
import useDeletePost from '../../hooks/posts';
import LevelContext from '../../context/level';
import PostContainer from './imagePostStyles';
import formatDate from '../../utils/formatDate';
import ThemeContext from '../../context/theme';
import mainDarkTheme from '../../styles/themes/MainDarkTheme';
import mainLightTheme from '../../styles/themes/MainLightTheme';
import ModalLikesButton from '../Splitter/ModalLikesButton';

const FullScreenImage = dynamic(() => import('../FullScreenImage'));
const OptionsMenu = dynamic(() => import('./OptionsMenu'));

const ImagePost: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState<boolean>();
  const { theme } = useContext(ThemeContext);
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
          <ThemeProvider
            theme={theme === 'light' ? mainLightTheme : mainDarkTheme}
          >
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
              <button
                onClick={() => setIsImageFullScreen(true)}
                onBlur={() => setIsImageFullScreen(false)}
                type="button"
                className="image-button"
              >
                <figure className="post-image">
                  <img
                    src={process.env.NEXT_PUBLIC_API_HOST + post.body}
                    alt="Publicação"
                  />
                </figure>
              </button>
              <div className="post-info">
                <div className="post-counts">
                  <ModalLikesButton post={post} likesCount={likesCount} />
                  <p>300k comentários</p>
                </div>
                <div className="publish-date">
                  <p>300k compartilhamentos</p>
                  <p>{publishDate()}</p>
                </div>
              </div>
              <div className="post-interaction">
                <IconButton
                  className={isLiked ? 'active' : ''}
                  type="button"
                  onClick={() => (isLiked ? dislikePost() : likePost())}
                  aria-label="Curtir"
                >
                  <div className="interactions-button">
                    {isLiked ? <FaHeart /> : <FaRegHeart />}
                    <p>Curtir</p>
                  </div>
                </IconButton>
                <Link href={`/post/${post._id}`}>
                  <a>
                    <IconButton aria-label="Comentar" type="button">
                      <div className="interactions-button">
                        <FaCommentAlt /> <p>Comentar</p>
                      </div>
                    </IconButton>
                  </a>
                </Link>
                <IconButton aria-label="Compartilhar" type="button">
                  <div className="interactions-button">
                    <FaShareAlt /> <p>Compartilhar</p>
                  </div>
                </IconButton>
                <IconButton
                  className="bookmark"
                  aria-label="Salvar"
                  type="button"
                >
                  <FaRegBookmark />
                </IconButton>
              </div>
            </div>
            {isImageFullScreen && (
              <FullScreenImage
                img={process.env.NEXT_PUBLIC_API_HOST + post.body}
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
