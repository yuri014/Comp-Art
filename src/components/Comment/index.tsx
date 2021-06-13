import React from 'react';
import Link from 'next/link';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import { IComment } from '@interfaces/Post';
import formatDistanceTimePass from '@utils/formatDistanceTimePass';
import TextBox from '@components/TextBox';
import formatLongNumbers from '@utils/formatLongNumber';
import { CommentContainer } from './styles';

export interface CommentProps {
  comment: IComment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => (
  <CommentContainer>
    <Link href={`/profile/${comment.author.owner}`}>
      <a className="author-image">
        <img
          src={process.env.NEXT_PUBLIC_API_HOST + comment.author.avatar}
          alt={`${comment.author.name}`}
        />
      </a>
    </Link>
    <div className="comment">
      <div className="comment-body">
        <Link href={`/profile/${comment.author.owner}`}>
          <a className="author-info">
            <p className="name">{comment.author.name}</p>
            <p className="username">@{comment.author.owner}</p>
          </a>
        </Link>
        <div className="comment-text">
          <TextBox text={comment.body} />
        </div>
        {comment.likesCount > 0 && (
          <button type="button" aria-label="Ver curtidas" className="likes">
            <FaHeart />
            <p>{formatLongNumbers(comment.likesCount)}</p>
          </button>
        )}
      </div>
      <div className="comment-interations">
        <button type="button" className="like">
          <FaRegHeart /> <p>Curtir</p>
        </button>
        <div className="created-at">
          {formatDistanceTimePass(comment.createdAt)}
        </div>
      </div>
    </div>
  </CommentContainer>
);

export default Comment;
