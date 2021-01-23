import React from 'react';
import Image from 'next/image';
import {
  FaCog,
  FaRegComment,
  FaRegHeart,
  FaRegShareSquare,
} from 'react-icons/fa';

import { PostContainer } from './styles';

const Post: React.FC = () => (
  <PostContainer>
    <div className="post-author">
      <div className="author-info">
        <figure>
          <Image src="/profile.jpg" alt="Imagem do perfil" layout="fill" />
        </figure>
        <div>
          <h4>Nome do Perfil</h4>
          <p>01/01/2021</p>
        </div>
      </div>
      <div className="post-config">
        <FaCog />
      </div>
    </div>
    <div className="post">
      <div className="post-description">
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <figure className="post-image">
        <Image src="/profile.jpg" alt="Publicação" layout="fill" />
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
