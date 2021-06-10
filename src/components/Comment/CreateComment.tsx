import React, { useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { gql, useMutation } from '@apollo/client';

import DraftEditor from '@components/DraftEditor';
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
        owner: {
          avatar: profile.avatar,
          name: profile.name,
          username: profile.owner,
        },
        text: commentField,
        createdAt: new Date().toISOString(),
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
        <img
          src={process.env.NEXT_PUBLIC_API_HOST + profile.avatar}
          alt={profile.owner}
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
          newComment.map(comment => (
            <Comment
              key={`${comment.owner}__${comment.createdAt}`}
              createdAt={comment.createdAt}
              owner={comment.owner}
              text={comment.text}
            />
          ))}
      </div>
    </>
  );
};

export default CreateComment;