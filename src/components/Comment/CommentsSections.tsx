import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { IconButton, TextField, ThemeProvider } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useLazyQuery } from '@apollo/client';

import Comment, { CommentProps } from '.';
import mainTheme from '../../styles/themes/MainTheme';
import { CommentsSectionContainer } from './styles';
import { AuthContext } from '../../context/auth';
import { GET_LOGGED_PROFILE } from '../../graphql/queries/profile';
import { ILoggedProfile, IProfile } from '../../interfaces/Profile';

interface CommentForm {
  comment: string;
}

const CommentsSections: React.FC = () => {
  const auth = useContext(AuthContext);
  const [newComment, setNewComment] = useState<Array<CommentProps>>([]);
  const [profile, setProfile] = useState<IProfile>();

  const [getProfile] = useLazyQuery<ILoggedProfile>(GET_LOGGED_PROFILE, {
    onCompleted: res => {
      setProfile(res.getLoggedProfile);
    },
  });

  useEffect(() => {
    if (auth) {
      getProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

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
        <ThemeProvider theme={mainTheme}>
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
        </ThemeProvider>
      )}
    </CommentsSectionContainer>
  );
};

export default CommentsSections;
