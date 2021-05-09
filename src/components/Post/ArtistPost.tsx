import React from 'react';

import { PostProps } from '@interfaces/Post';
import AudioPost from './AudioPost';
import ImagePost from './ImagePost';

const ArtistPost: React.FC<PostProps> = ({ post }) => (
  <>
    {post.mediaId === 2 ? (
      <AudioPost post={post} />
    ) : (
      <ImagePost image={post.body} />
    )}
  </>
);

export default ArtistPost;
