import React, { useContext, useState } from 'react';
import Link from 'next/link';

import { IComment } from '@interfaces/Post';
import formatDistanceTimePass from '@utils/formatDistanceTimePass';
import TextBox from '@components/TextBox';
import { AuthContext } from '@context/auth';
import ProfileImage from '@components/ProfileImage';
import { CommentContainer } from './styles';
import CommentMenu from './CommentMenu';

export interface CommentProps {
  comment: IComment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const auth = useContext(AuthContext);
  const [isDeleted, setIsDeleted] = useState(false);

  if (isDeleted) {
    return <></>;
  }

  return (
    <CommentContainer>
      <Link href={`/profile/${comment.author.owner}`}>
        <a className="author-image">
          <ProfileImage
            alt={comment.author.name}
            avatar={comment.author.avatar}
            username={comment.author.owner}
            className="author-image"
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
          {auth.user.username === comment.author.owner && (
            <CommentMenu setIsDeleted={setIsDeleted} id={comment._id} />
          )}
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
};

export default Comment;
