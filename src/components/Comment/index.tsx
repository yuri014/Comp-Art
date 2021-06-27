import React from 'react';
import Link from 'next/link';

import { IComment } from '@interfaces/Post';
import formatDistanceTimePass from '@utils/formatDistanceTimePass';
import TextBox from '@components/TextBox';
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
      </div>
      <div className="comment-interations">
        <div className="created-at">
          {formatDistanceTimePass(comment.createdAt)}
        </div>
      </div>
    </div>
  </CommentContainer>
);

export default Comment;
