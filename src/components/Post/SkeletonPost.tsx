import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { ThemeProvider } from '@material-ui/core';
import { FiMoreHorizontal } from 'react-icons/fi';

import mainTheme from '../../styles/themes/MainTheme';
import PostContainer from './styles';

const SkeletonPost: React.FC = () => (
  <PostContainer>
    <ThemeProvider theme={mainTheme}>
      <div className="post-author">
        <div className="author-info">
          <Skeleton animation="wave" variant="circle" width={60} height={60} />
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
          <FiMoreHorizontal />
        </div>
      </div>
      <div className="post">
        <div className="post-description">
          <Skeleton animation="wave" width="100%" height={60} />
        </div>
        <Skeleton animation="wave" variant="rect" width="100%" height={378} />
      </div>
    </ThemeProvider>
  </PostContainer>
);

export default SkeletonPost;
