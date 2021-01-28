import React from 'react';
import Image from 'next/image';
import { Badge, ThemeProvider } from '@material-ui/core';
import {
  FaCog,
  FaRegComment,
  FaRegHeart,
  FaRegShareSquare,
} from 'react-icons/fa';

import { PostContainer } from './styles';
import { PostProps } from '../../interfaces/Post';
import mainTheme from '../../styles/themes/MainTheme';

const Post: React.FC<PostProps> = ({ post }) => (
  <PostContainer>
    <div className="post-author">
      <div className="author-info">
        <figure>
          <Image src="/profile.jpg" alt="Imagem do perfil" layout="fill" />
        </figure>
        <div>
          <h4>{post.artist}</h4>
          <p>{new Date(post.createdAt).toLocaleDateString('en-GB')}</p>
        </div>
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
            <Badge badgeContent={1} color="primary">
              <FaRegHeart />
            </Badge>
            <p>Favoritar</p>
          </div>
          <div>
            <Badge badgeContent={4} color="primary">
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

export default Post;
