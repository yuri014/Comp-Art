import React from 'react';

import { PostProps } from '@interfaces/Post';
import AuthorInfo from '@components/Post/utils/AuthorInfo';
import ShareContainer from './styles';

const Share: React.FC<PostProps> = ({ post }) => (
  <ShareContainer>
    <div className="share">
      <div className="share-info">
        <AuthorInfo
          postID={post._id}
          profile={post.post.artist}
          handleDeletePost={() => console.log('a')}
        />
      </div>
    </div>
  </ShareContainer>
);

export default Share;
