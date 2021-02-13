import Link from 'next/link';
import React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import CommentContainer from './styles';

export interface CommentProps {
  avatar: string;
  owner: {
    name: string;
    username: string;
  };
  text: string;
}

const Comment: React.FC<CommentProps> = ({ avatar, owner, text }) => (
  <CommentContainer>
    <div className="author-image">
      <img src={avatar || '/profile.jpg'} alt={`${owner.name}`} />
    </div>
    <div className="comment">
      <div className="comment-body">
        <Link href="/profile">
          <a className="author-info">
            <p className="name">{owner.name}</p>
            <p className="username">@{owner.username}</p>
          </a>
        </Link>
        <p className="comment-text">{text}</p>
      </div>
      <div className="comment-interations">
        <FaRegHeart /> <p>Curtir</p>
      </div>
    </div>
  </CommentContainer>
);

export default Comment;
