/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, ThemeProvider } from '@material-ui/core';
import Link from 'next/link';
import {
  FaHeart,
  FaRegComment,
  FaRegHeart,
  FaRegShareSquare,
} from 'react-icons/fa';

import { PostContainer } from './styles';
import { PostProps } from '../../interfaces/Post';
import mainTheme from '../../styles/themes/MainTheme';
import OptionsMenu from './OptionsMenu';
import useDeletePost from '../../hooks/posts';

const ImagePost: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState<boolean>();
  const [likesCount, setLikesCount] = useState<number>();

  useEffect(() => {
    setIsLiked(post.isLiked);
    setLikesCount(post.likesCount);
  }, [post.isLiked, post.likesCount]);

  const [deletePost, dislikePost, likePost] = useDeletePost(
    post._id,
    () => {
      setIsLiked(false);
      setLikesCount(likesCount - 1);
    },
    () => {
      setIsLiked(true);
      setLikesCount(likesCount + 1);
    },
  );

  return (
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
              deletePost={deletePost}
              id={post._id}
              username={post.artist.username}
            />
          </div>
        </div>
        <div className="post">
          <div className="post-description">
            <p>{post.description}</p>
          </div>
          <figure className="post-image">
            <Image src={post.body} alt="Publicação" layout="fill" />
          </figure>
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
    </PostContainer>
  );
};

export default React.memo(ImagePost);
