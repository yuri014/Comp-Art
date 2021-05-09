import React from 'react';

import { PostProps } from '@interfaces/Post';
import AuthorInfo from '@components/Post/utils/AuthorInfo';
import ArtistPost from '@components/Post/ArtistPost';
import usePostAsLink from '@hooks/postAsLink';
import publishDate from '@utils/publishDate';
import ShareContainer from './styles';

const Share: React.FC<PostProps> = ({ post }) => {
  const handlePostLink = usePostAsLink(post.post._id);

  return (
    <ShareContainer role="button" tabIndex={0} onClick={e => handlePostLink(e)}>
      <div className="share">
        <div className="share-info">
          <AuthorInfo
            postID={post._id}
            profile={post.post.artist}
            handleDeletePost={() => console.log('a')}
          />
        </div>
        <div className="share-content">
          {post.post.description && (
            <div className="description">{post.post.description}</div>
          )}
          <ArtistPost post={post.post} />
          <div className="date">
            <p>{publishDate(post.post.createdAt)}</p>
          </div>
        </div>
      </div>
    </ShareContainer>
  );
};

export default Share;
