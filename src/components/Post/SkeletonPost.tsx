import React from 'react';

import { ThemeProvider } from '@material-ui/core';
import {
  FaCog,
  FaRegComment,
  FaRegHeart,
  FaRegShareSquare,
} from 'react-icons/fa';
import Skeleton from '@material-ui/lab/Skeleton';

import mainTheme from '../../styles/themes/MainTheme';
import PostContainer from './imagePostStyles';

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
            </div>
            <div>
              <FaRegComment />
            </div>
            <div>
              <FaRegShareSquare />
            </div>
          </div>
        </ThemeProvider>
      </div>
    </ThemeProvider>
  </PostContainer>
);

export default SkeletonPost;
