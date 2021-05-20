import React, { useContext } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { ThemeProvider } from '@material-ui/core';
import { FiMoreHorizontal } from 'react-icons/fi';

import ThemeContext from '@context/theme';
import mainLightTheme from '@styles/themes/MainLightTheme';
import mainDarkTheme from '@styles/themes/MainDarkTheme';
import PostContainer from './styles';

const SkeletonPost: React.FC = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <PostContainer>
      <ThemeProvider theme={isDarkMode ? mainLightTheme : mainDarkTheme}>
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
            <FiMoreHorizontal />
          </div>
        </div>
        <div className="post">
          <div className="post-description-loading">
            <Skeleton animation="wave" width="100%" height={60} />
          </div>
          <Skeleton animation="wave" variant="rect" width="100%" height={378} />
        </div>
      </ThemeProvider>
    </PostContainer>
  );
};

export default SkeletonPost;
