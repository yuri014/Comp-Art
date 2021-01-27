import React from 'react';
import Image from 'next/image';
import {
  FaCog,
  FaRegComment,
  FaRegHeart,
  FaRegShareSquare,
} from 'react-icons/fa';

import { PostContainer } from './styles';
import { PostProps } from '../../interfaces/Post';

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
      <div className="post-interaction">
        <div>
          <FaRegHeart />
          <p>Favoritar</p>
        </div>
        <div>
          <FaRegComment />
          <p>Comentar</p>
        </div>
        <div>
          <FaRegShareSquare />
          <p>Compartilhar</p>
        </div>
      </div>
    </div>
  </PostContainer>
);

export default Post;
