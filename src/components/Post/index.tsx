import React from 'react';
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
        <img
          src="https://images.pexels.com/photos/3981624/pexels-photo-3981624.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="Imagem de perfil"
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
      <img
        src="https://images.pexels.com/photos/3971983/pexels-photo-3971983.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt="Publicação"
      />
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
