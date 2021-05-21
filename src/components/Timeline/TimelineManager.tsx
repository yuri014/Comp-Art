import React from 'react';

import { Timeline } from '@interfaces/Post';
import { UseInfiniteScroll } from '@hooks/infiniteScroll';
import Post from '@components/Post';
import ArtistPost from '@components/Post/ArtistPost';
import Share from '@components/Share';
import usePostsMutations from '@hooks/postMutations';

interface TimelineManagerProps {
  posts: Timeline[];
  lastPostRef: UseInfiniteScroll;
}

const TimelineManager: React.FC<TimelineManagerProps> = ({
  posts,
  lastPostRef,
}) => (
  <>
    {posts.map((post, index) => {
      const postsLenght = posts.length;
      if (postsLenght === index + 1 && postsLenght) {
        if (post.artist) {
          return (
            <div key={post._id} ref={lastPostRef}>
              <Post useDeletePosts={usePostsMutations} post={post}>
                <ArtistPost post={post} />
              </Post>
            </div>
          );
        }

        return (
          <div key={`${post._id}`} ref={lastPostRef}>
            <Post useDeletePosts={usePostsMutations} post={post}>
              <Share post={post} />
            </Post>
          </div>
        );
      }
      if (post.artist) {
        return (
          <div key={post._id}>
            <Post useDeletePosts={usePostsMutations} post={post}>
              <ArtistPost post={post} />
            </Post>
          </div>
        );
      }

      return (
        <div key={post._id}>
          <Post useDeletePosts={usePostsMutations} post={post}>
            <Share post={post} />
          </Post>
        </div>
      );
    })}
  </>
);

export default TimelineManager;
