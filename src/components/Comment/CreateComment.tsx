import React, { useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { gql, useMutation } from '@apollo/client';

import DraftEditor from '@components/DraftEditor';
import ProfileImage from '@components/ProfileImage';
import usePreventMemoryLeak from '@hooks/preventMemoryLeak';
import { CommentsSectionsProps } from '@interfaces/Post';
import GET_COMMENTS from '@graphql/queries/comment';
import CommentSkeleton from './CommentSkeleton';

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
  const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
    refetchQueries: [
      {
        query: GET_COMMENTS,
        variables: { id: postId, offset: 0 },
      },
    ],
  });

  const onSubmit = () => {
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
      <div className="comment-content">{loading && <CommentSkeleton />}</div>
    </>
  );
};

export default CreateComment;
