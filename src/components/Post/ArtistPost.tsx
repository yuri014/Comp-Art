import React from 'react';

import { ArtistPostProps } from '@interfaces/Post';
import AudioPost from './AudioPost';
import ImagePost from './ImagePost';

const ArtistPost: React.FC<ArtistPostProps> = ({ isShare, post }) => {
  switch (post.mediaId) {
    case 1:
      return (
        <ImagePost
          alt={post.alt}
          image={post.body}
          imageHeight={post.imageHeight}
        />
      );
    case 2:
      return <AudioPost isShare={isShare} post={post} />;
    case 4:
      return <></>;
    default:
      return <></>;
  }
};

export default ArtistPost;
