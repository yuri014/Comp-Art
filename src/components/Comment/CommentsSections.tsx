import React, { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { IconButton, TextField, ThemeProvider } from '@material-ui/core';

import Comment, { CommentProps } from '.';
import mainTheme from '../../styles/themes/MainTheme';
import { CommentsSectionContainer } from './styles';

const CommentsSections: React.FC = () => {
  const [newComment, setNewComment] = useState<Array<CommentProps>>([]);

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
      <ThemeProvider theme={mainTheme}>
        <footer>
          <img src="/profile.jpg" alt="Profile name" />
          <TextField
            id="send-comment"
            label="Enviar um comentário"
            fullWidth
            multiline
          />
          <IconButton
            onClick={() =>
              setNewComment([
                ...newComment,
                {
                  avatar: '/profile.jpg',
                  owner: {
                    name: 'Teste',
                    username: 'teste01',
                  },
                  text: 'exemplo 123',
                },
              ])
            }
            aria-label="enviar comentário"
            color="primary"
          >
            <div className="send-button">
              <AiOutlineSend />
            </div>
          </IconButton>
        </footer>
      </ThemeProvider>
    </CommentsSectionContainer>
  );
};

export default CommentsSections;
