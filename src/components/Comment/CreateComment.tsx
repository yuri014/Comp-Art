import React, { useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { gql, useMutation } from '@apollo/client';

import DraftEditor from '@components/DraftEditor';
import ProfileImage from '@components/ProfileImage';
import usePreventMemoryLeak from '@hooks/preventMemoryLeak';
import { CommentsSectionsProps } from '@interfaces/Post';
import Comment, { CommentProps } from '.';

const CREATE_COMMENT = gql`
  mutation CreateComment($id: ID!, $body: String!) {
    comment(postID: $id, comment: $body)
  }
`;

const CreateComment: React.FC<CommentsSectionsProps> = ({
  postId,
  profile,
}) => {
  const [commentField, setCommentField] = useState('');
  const [progress, setProgress] = useState(0);

  const isMount = usePreventMemoryLeak();
  const [newComment, setNewComment] = useState<Array<CommentProps>>([]);
  const [createComment] = useMutation(CREATE_COMMENT);

  const onSubmit = () => {
    setNewComment([
      ...newComment,
      {
        comment: {
          _id: '',
          author: {
            avatar: profile.avatar || '',
            name: profile.name,
            owner: profile.owner,
          },
          body: commentField,
          createdAt: new Date().toISOString(),
        },
      },
    ]);
    createComment({ variables: { id: postId, body: commentField } });
  };

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <ProfileImage
          alt={profile.name}
          avatar={profile.avatar}
          username={profile.owner}
          className="profile-image"
        />
        {isMount && (
          <DraftEditor
            setText={setCommentField}
            setProgress={setProgress}
            limit={255}
            placeholder="Digite aqui o seu comentário..."
          />
        )}
        <button
          disabled={progress >= 100 || commentField.length === 0}
          aria-label="enviar comentário"
          type="submit"
        >
          <IoMdSend />
        </button>
      </form>
      <div className="comment-content">
        {newComment &&
          newComment.map(comment => <Comment comment={comment.comment} />)}
      </div>
    </>
  );
};

export default CreateComment;
