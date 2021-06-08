import formatDistanceTimePass from '@utils/formatDistanceTimePass';
import Link from 'next/link';
import React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { CommentContainer } from './styles';

export interface CommentProps {
  text: string;
  createdAt: string;
  owner: {
    avatar: string;
    name: string;
    username: string;
  };
}

const Comment: React.FC<CommentProps> = ({ owner, text, createdAt }) => (
  <CommentContainer>
    <div className="author-image">
      <img
        src={process.env.NEXT_PUBLIC_API_HOST + owner.avatar}
        alt={`${owner.name}`}
      />
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
        <div className="like">
          <FaRegHeart /> <p>Curtir</p>
        </div>
        <div className="created-at">{formatDistanceTimePass(createdAt)}</div>
      </div>
    </div>
  </CommentContainer>
);

export default Comment;
