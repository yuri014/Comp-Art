import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { ThemeProvider } from '@material-ui/core';

import Post from '../Post';
import LoadingPost from '../Post/LoadingPost';
import { GET_POSTS } from '../../graphql/queries/post';
import { IGetPosts } from '../../interfaces/Post';
import useInfiniteScroll from '../../hooks/infiniteScroll';
import mainLightTheme from '../../styles/themes/MainLightTheme';
import mainDarkTheme from '../../styles/themes/MainDarkTheme';
import ThemeContext from '../../context/theme';

const Timeline: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { data, loading, error, fetchMore } = useQuery<IGetPosts>(GET_POSTS, {
    variables: { offset: 0 },
  });

  const lastPostRef = useInfiniteScroll(
    data,
    () =>
      !!data.getPosts &&
      fetchMore({
        variables: { offset: data.getPosts.length },
      }).then(newPosts => newPosts.data.getPosts.length < 3),
  );
  return (
    <ThemeProvider theme={theme === 'light' ? mainLightTheme : mainDarkTheme}>
      {loading || error || data.getPosts.length === 0 ? (
        <LoadingPost loading={loading} />
      ) : (
        data.getPosts.map((post, index) => {
          if (data.getPosts.length === index + 1 && data.getPosts.length > 3) {
            return (
              <div key={`${post.artist}_${post.createdAt}`} ref={lastPostRef}>
                <Post post={post} />
              </div>
            );
          }
          return (
            <div key={`${post.artist}_${post.createdAt}`}>
              <Post post={post} />
            </div>
          );
        })
      )}
    </ThemeProvider>
  );
};

export default Timeline;
