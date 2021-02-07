import React, { useState } from 'react';
import Image from 'next/image';
import { Button, ThemeProvider } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import {
  FaCog,
  FaHeart,
  FaRegComment,
  FaRegHeart,
  FaRegShareSquare,
} from 'react-icons/fa';

import { PostContainer } from './styles';
import { PostProps } from '../../interfaces/Post';
import mainTheme from '../../styles/themes/MainTheme';
import { LIKE_POST } from '../../graphql/mutations/post';

const ImagePost: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likePost] = useMutation(LIKE_POST, {
    // eslint-disable-next-line no-underscore-dangle
    variables: { id: post._id },
    onCompleted: data => setIsLiked(data.like),
  });

  return (
    <PostContainer>
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
                  <p>{new Date(post.createdAt).toLocaleDateString('en-GB')}</p>
                  <p>&nbsp;●&nbsp;</p>
                  <p>@{post.artist.username}</p>
                </span>
              </div>
            </a>
          </Link>
        </div>
        <div className="post-config">
          <FaCog />
        </div>
      </div>
      <div className="post">
        <div className="post-description">
          <p>{post.description}</p>
        </div>
        <figure className="post-image">
          <Image src={post.body} alt="Publicação" layout="fill" />
        </figure>
        <ThemeProvider theme={mainTheme}>
          <div className="post-interaction">
            <Button
              className={isLiked ? 'active' : ''}
              type="button"
              onClick={() => likePost()}
              title="Curtir"
            >
              {isLiked ? <FaHeart /> : <FaRegHeart />}
              <p>{post.likesCount}</p>
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
        </ThemeProvider>
      </div>
    </PostContainer>
  );
};

export default ImagePost;
