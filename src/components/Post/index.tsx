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
import AudioPost from './AudioPost';
import ImagePost from './ImagePost';

import useDeletePost from '../../hooks/posts';
import LevelContext from '../../context/level';
import PostContainer from './styles';
import formatDate from '../../utils/formatDate';
import ThemeContext from '../../context/theme';
import mainDarkTheme from '../../styles/themes/MainDarkTheme';
import mainLightTheme from '../../styles/themes/MainLightTheme';
import ModalLikesButton from '../Splitter/ModalLikesButton';

const OptionsMenu = dynamic(() => import('./OptionsMenu'));

const Post: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState<boolean>();
  const { theme } = useContext(ThemeContext);
  const [likesCount, setLikesCount] = useState<number>();
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
              {post.mediaId === 2 ? (
                <AudioPost post={post} />
              ) : (
                <ImagePost image={post.body} />
              )}
              <div className="post-info">
                <div className="post-counts">
                  <ModalLikesButton post={post} likesCount={likesCount} />
                  <p>300k comentários</p>
                  <p className="share-count">300k compartilhamentos</p>
                </div>
                <div className="publish-date">
                  <p className="share-count-mobile">300k compartilhamentos</p>
                  <p>{publishDate()}</p>
                </div>
              </div>
              <div className="post-interaction">
                <div className="interaction-group">
                  <IconButton
                    className={isLiked ? 'active' : ''}
                    type="button"
                    onClick={() => (isLiked ? dislikePost() : likePost())}
                    aria-label="Curtir"
                  >
                    <div className="interactions-button">
                      {isLiked ? (
                        <FaHeart size={20} />
                      ) : (
                        <FaRegHeart size={20} />
                      )}
                      <p>Curtir</p>
                    </div>
                  </IconButton>
                  <Link href={`/post/${post._id}`}>
                    <a>
                      <IconButton aria-label="Comentar" type="button">
                        <div className="interactions-button">
                          <FaCommentAlt size={20} /> <p>Comentar</p>
                        </div>
                      </IconButton>
                    </a>
                  </Link>
                  <IconButton aria-label="Compartilhar" type="button">
                    <div className="interactions-button">
                      <FaShareAlt size={20} /> <p>Compartilhar</p>
                    </div>
                  </IconButton>
                </div>
                <IconButton
                  className="bookmark"
                  aria-label="Salvar"
                  type="button"
                >
                  <div className="interactions-button">
                    <FaRegBookmark size={20} /> <p>Salvar</p>
                  </div>
                </IconButton>
              </div>
            </div>
          </ThemeProvider>
        </PostContainer>
      )}
    </>
  );
};

export default React.memo(Post);
