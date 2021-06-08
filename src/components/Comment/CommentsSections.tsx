import React, { useEffect, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { gql, useMutation, useQuery } from '@apollo/client';

import DraftEditor from '@components/DraftEditor';
import usePreventMemoryLeak from '@hooks/preventMemoryLeak';
import { IProfile } from '@interfaces/Profile';
import Comment, { CommentProps } from '.';
import { CommentsSectionContainer } from './styles';
import useInfiniteScroll from '../../hooks/infiniteScroll';
import { IGetComment } from '../../interfaces/Post';
import { CORE_PROFILE_VIEW } from '../../graphql/fragments/profile';
import CommentSkeleton from './CommentSkeleton';

const CREATE_COMMENT = gql`
  mutation CreateComment($id: ID!, $body: String!) {
    comment(postID: $id, comment: $body)
  }
`;

const GET_COMMENTS = gql`
  ${CORE_PROFILE_VIEW}
  query GetComments($id: ID!, $offset: Int!) {
    getComments(postID: $id, offset: $offset) {
      author {
        ...CoreProfileView
      }
      body
      createdAt
    }
  }
`;

interface CommentsSectionsProps {
  postId: string;
  profile: IProfile;
}

const CommentsSections: React.FC<CommentsSectionsProps> = ({
  postId,
  profile,
}) => {
  const [commentField, setCommentField] = useState('');
  const [progress, setProgress] = useState(0);

  const isMount = usePreventMemoryLeak();
  const [newComment, setNewComment] = useState<Array<CommentProps>>([]);

  const {
    data: commentsData,
    loading,
    error,
    fetchMore,
    client,
  } = useQuery<IGetComment>(GET_COMMENTS, {
    variables: { id: postId, offset: 0 },
  });

  useEffect(
    () => () => {
      client.cache.evict({ fieldName: 'getComments' });
    },
    [client.cache],
  );

  const lastPostRef = useInfiniteScroll(
    commentsData,
    () =>
      !!commentsData.getComments &&
      fetchMore({
        variables: { offset: commentsData.getComments.length },
      }).then(newComments => newComments.data.getComments.length < 3),
  );

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
    <CommentsSectionContainer>
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
      {loading || error ? (
        <CommentSkeleton />
      ) : (
        commentsData.getComments.map((comment, index) => {
          if (commentsData.getComments.length === index + 1) {
            return (
              <span
                key={`${comment.author.owner}_${comment.createdAt}`}
                ref={lastPostRef}
              >
                <Comment
                  createdAt={comment.createdAt}
                  text={comment.body}
                  owner={{
                    avatar: comment.author.avatar,
                    name: comment.author.name,
                    username: comment.author.owner,
                  }}
                />
              </span>
            );
          }

          return (
            <span key={`${comment.author.owner}_${comment.createdAt}`}>
              <Comment
                createdAt={comment.createdAt}
                text={comment.body}
                owner={{
                  avatar: comment.author.avatar,
                  name: comment.author.name,
                  username: comment.author.owner,
                }}
              />
            </span>
          );
        })
      )}
    </CommentsSectionContainer>
  );
};

export default CommentsSections;
