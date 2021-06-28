import React from 'react';

import { Timeline } from '@interfaces/Post';
import { UseInfiniteScroll } from '@hooks/infiniteScroll';
import Post from '@components/Post';
import ArtistPost from '@components/Post/ArtistPost';
import Share from '@components/Share';
import usePostsMutations from '@hooks/postMutations';
import useSharesMutations from '@hooks/shareMutations';

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
      const postsLength = posts.length;

      if (postsLength === index + 1 && postsLength) {
        if (post.artist) {
          return (
            <div key={post._id} ref={lastPostRef}>
              <Post useInteractions={usePostsMutations} post={post}>
                <ArtistPost post={post} />
              </Post>
            </div>
          );
        }

        return (
          <div key={`${post._id}`} ref={lastPostRef}>
            <Post useInteractions={useSharesMutations} post={post}>
              <Share post={post} />
            </Post>
          </div>
        );
      }
      if (post.artist) {
        return (
          <div key={post._id}>
            <Post useInteractions={usePostsMutations} post={post}>
              <ArtistPost post={post} />
            </Post>
          </div>
        );
      }

      return (
        <div key={post._id}>
          <Post useInteractions={useSharesMutations} post={post}>
            <Share post={post} />
          </Post>
        </div>
      );
    })}
  </>
);

export default TimelineManager;
