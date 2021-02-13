import Link from 'next/link';
import React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import CommentContainer from './styles';

const Comment: React.FC = () => (
  <CommentContainer>
    <div className="author-image">
      <img src="/profile.jpg" alt="Author" />
    </div>
    <div className="comment">
      <div className="comment-body">
        <Link href="/profile">
          <a className="author-info">
            <p className="name">Teste</p>
            <p className="username">@teste10</p>
          </a>
        </Link>
        <p className="comment-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
          aliquam!
        </p>
      </div>
      <div className="comment-interations">
        <FaRegHeart /> <p>Curtir</p>
      </div>
    </div>
  </CommentContainer>
);

export default Comment;
