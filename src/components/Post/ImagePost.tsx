import React from 'react';
import Image from 'next/image';
import { Badge, ThemeProvider } from '@material-ui/core';
import {
  FaCog,
  FaRegComment,
  FaRegHeart,
  FaRegShareSquare,
} from 'react-icons/fa';

import Link from 'next/link';
import { PostContainer } from './styles';
import { PostProps } from '../../interfaces/Post';
import mainTheme from '../../styles/themes/MainTheme';

const ImagePost: React.FC<PostProps> = ({ post }) => (
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
          <div>
            <Badge badgeContent={post.likesCount} color="primary">
              <FaRegHeart />
            </Badge>
            <p>Favoritar</p>
          </div>
          <div>
            <Badge badgeContent={post.commentsCount} color="primary">
              <FaRegComment />
            </Badge>
            <p>Comentar</p>
          </div>
          <div>
            <Badge badgeContent={post.sharedCount} color="primary">
              <FaRegShareSquare />
            </Badge>
            <p>Compartilhar</p>
          </div>
        </div>
      </ThemeProvider>
    </div>
  </PostContainer>
);

export default ImagePost;
