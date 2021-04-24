import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { IconButton, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { gql, useMutation, useQuery } from '@apollo/client';

import Comment, { CommentProps } from '.';
import { CommentsSectionContainer } from './styles';
import { AuthContext } from '../../context/auth';
import { ILoggedProfile, IProfile } from '../../interfaces/Profile';
import useInfiniteScroll from '../../hooks/infiniteScroll';
import { IGetComment } from '../../interfaces/Post';
import { CORE_PROFILE_VIEW } from '../../graphql/fragments/profile';

const GET_LOGGED_PROFILE = gql`
  ${CORE_PROFILE_VIEW}
  query GetCommentProfile {
    getLoggedProfile {
      ...CoreProfileView
    }
  }
`;

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

interface CommentForm {
  comment: string;
}

interface CommentsSectionsProps {
  postId: string;
}

const CommentsSections: React.FC<CommentsSectionsProps> = ({ postId }) => {
  const auth = useContext(AuthContext);
  const [newComment, setNewComment] = useState<Array<CommentProps>>([]);
  const [profile, setProfile] = useState<IProfile>();

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

  const { data: getProfile } = useQuery<ILoggedProfile>(GET_LOGGED_PROFILE, {
    onCompleted: () => {
      if (auth) {
        setProfile(getProfile.getLoggedProfile);
      }
    },
  });

  const [createComment] = useMutation(CREATE_COMMENT);

  const { handleSubmit, register } = useForm<CommentForm>();

  const onSubmit = (commentInput: CommentForm) => {
    setNewComment([
      ...newComment,
      {
        avatar: profile.avatar,
        owner: {
          name: profile.name,
          username: profile.owner,
        },
        text: commentInput.comment,
      },
    ]);
    createComment({ variables: { id: postId, body: commentInput.comment } });
  };

  return (
    <CommentsSectionContainer>
      <div className="comment-content">
        {newComment &&
          newComment.map(comment => (
            <Comment
              avatar={comment.avatar}
              owner={comment.owner}
              text={comment.text}
            />
          ))}
      </div>
      {loading || error ? (
        <p>loading</p>
      ) : (
        commentsData.getComments.map((comment, index) => {
          if (commentsData.getComments.length === index + 1) {
            return (
              <span
                key={`${comment.author.owner}_${comment.createdAt}`}
                ref={lastPostRef}
              >
                <Comment
                  avatar={comment.author.avatar}
                  text={comment.body}
                  owner={{
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
                avatar={comment.author.avatar}
                text={comment.body}
                owner={{
                  name: comment.author.name,
                  username: comment.author.owner,
                }}
              />
            </span>
          );
        })
      )}
      {profile && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <img
            src={process.env.NEXT_PUBLIC_API_HOST + profile.avatar}
            alt="Profile name"
          />
          <TextField
            id="send-comment"
            label="Enviar um comentário"
            fullWidth
            multiline
            name="comment"
            inputRef={register({
              required: true,
            })}
            required
          />
          <IconButton
            aria-label="enviar comentário"
            color="primary"
            type="submit"
          >
            <div className="send-button">
              <AiOutlineSend />
            </div>
          </IconButton>
        </form>
      )}
    </CommentsSectionContainer>
  );
};

export default CommentsSections;
