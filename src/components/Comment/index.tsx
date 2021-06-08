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
    <Link href={`/profile/${owner.username}`}>
      <a className="author-image">
        <img
          src={process.env.NEXT_PUBLIC_API_HOST + owner.avatar}
          alt={`${owner.name}`}
        />
      </a>
    </Link>
    <div className="comment">
      <div className="comment-body">
        <Link href={`/profile/${owner.username}`}>
          <a className="author-info">
            <p className="name">{owner.name}</p>
            <p className="username">@{owner.username}</p>
          </a>
        </Link>
        <p className="comment-text">{text}</p>
      </div>
      <div className="comment-interations">
        <button type="button" className="like">
          <FaRegHeart /> <p>Curtir</p>
        </button>
        <div className="created-at">{formatDistanceTimePass(createdAt)}</div>
      </div>
    </div>
  </CommentContainer>
);

export default Comment;
