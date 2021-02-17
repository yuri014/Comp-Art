import React, { useContext, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { IconButton, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { gql, useMutation, useQuery } from '@apollo/client';

import Comment, { CommentProps } from '.';
import { CommentsSectionContainer } from './styles';
import { AuthContext } from '../../context/auth';
import { ILoggedProfile, IProfile } from '../../interfaces/Profile';

const GET_LOGGED_PROFILE = gql`
  query GetCommentProfile {
    getLoggedProfile {
      name
      avatar
      owner
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation CreateComment($id: ID!, $body: String!) {
    comment(postID: $id, comment: $body)
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
        avatar: profile.avatar || '/profile.jpg',
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
      {profile && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <img src={profile.avatar || '/profile.jpg'} alt="Profile name" />
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
