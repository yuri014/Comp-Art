/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Button, ThemeProvider } from '@material-ui/core';
import { FaHeart, FaRegHeart, FaRegShareSquare } from 'react-icons/fa';

import { PostProps } from '../../interfaces/Post';
import mainTheme from '../../styles/themes/MainTheme';
import useDeletePost from '../../hooks/posts';
import { PostContainer } from './styles';

const FullImagePost: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState<boolean>();
  const [likesCount, setLikesCount] = useState<number>();

  useEffect(() => {
    setIsLiked(post.isLiked);
    setLikesCount(post.likesCount);
  }, [post.isLiked, post.likesCount]);

  const [, dislikePost, likePost] = useDeletePost(
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
    <PostContainer className="full-post">
      <ThemeProvider theme={mainTheme}>
        <div className="post">
          <figure className="post-image">
            <img src={post.body} alt="Publicação" />
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

export default React.memo(FullImagePost);
