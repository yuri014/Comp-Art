import React from 'react';
import Image from 'next/image';
import {
  FaCog,
  FaRegComment,
  FaRegHeart,
  FaRegShareSquare,
} from 'react-icons/fa';

import PostContainer from './styles';

const Post: React.FC = () => (
  <PostContainer>
    <div className="post-author">
      <div className="author-info">
        <Image
          src="/profile.jpg"
          alt="Imagem do perfil"
          width={500}
          height={500}
        />
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
      <Image src="/profile.jpg" alt="Publicação" width={1200} height={1200} />
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
