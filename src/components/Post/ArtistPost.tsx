import React from 'react';

import { ArtistPostProps } from '@interfaces/Post';
import AudioPost from './AudioPost';
import ImagePost from './ImagePost';

const ArtistPost: React.FC<ArtistPostProps> = ({ isShare, post }) => (
  <>
    {post.mediaId === 2 ? (
      <AudioPost isShare={isShare} post={post} />
    ) : (
      <ImagePost image={post.body} />
    )}
  </>
);

export default ArtistPost;
