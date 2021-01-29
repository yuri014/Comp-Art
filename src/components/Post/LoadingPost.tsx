import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import {
  FaCog,
  FaRegComment,
  FaRegHeart,
  FaRegShareSquare,
} from 'react-icons/fa';
import Skeleton from '@material-ui/lab/Skeleton';

import { PostContainer } from './styles';
import mainTheme from '../../styles/themes/MainTheme';
import EmptyPost from './Empty';

interface LoadingProps {
  loading: boolean;
}

const LoadingPost: React.FC<LoadingProps> = ({ loading }) => (
  <>
    {loading ? (
      <PostContainer>
        <div className="post-author">
          <div className="author-info">
            <Skeleton
              animation="wave"
              variant="circle"
              width={60}
              height={60}
            />
            <div>
              <Skeleton animation="wave" width={150} height={24} />
              <span>
                <Skeleton
                  animation="wave"
                  width={120}
                  height={24}
                  component="p"
                />
              </span>
            </div>
          </div>
          <div className="post-config">
            <FaCog />
          </div>
        </div>
        <div className="post">
          <div className="post-description">
            <Skeleton animation="wave" width="100%" height={60} />
          </div>
          <Skeleton animation="wave" variant="rect" width="100%" height={478} />
          <ThemeProvider theme={mainTheme}>
            <div className="post-interaction">
              <div>
                <FaRegHeart />
                <p>Favoritar</p>
              </div>
              <div>
                <FaRegComment />
                <p>Comentar</p>
              </div>
              <div>
                <FaRegShareSquare />
                <p>Compartilhar</p>
              </div>
            </div>
          </ThemeProvider>
        </div>
      </PostContainer>
    ) : (
      <EmptyPost />
    )}
  </>
);

export default LoadingPost;
