import React from 'react';

import { PostProps } from '@interfaces/Post';
import AuthorInfo from '@components/Post/utils/AuthorInfo';
import ArtistPost from '@components/Post/ArtistPost';
import usePostAsLink from '@hooks/postAsLink';
import TextBox from '@components/TextBox';
import ShareContainer from './styles';

const Share: React.FC<PostProps> = ({ post }) => {
  const handlePostLink = usePostAsLink(post.post._id);

  return (
    <ShareContainer
      role="button"
      tabIndex={0}
      onMouseDown={e => handlePostLink(e)}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          handlePostLink(e);
        }
      }}
    >
      <div className="share">
        <div className="share-info">
          <AuthorInfo
            createdAt={post.createdAt}
            postID={post._id}
            profile={post.post.artist}
            handleDeletePost={() => console.log('a')}
          />
        </div>
        <div className="share-content">
          {post.post.description && (
            <div className="description">
              <TextBox text={post.post.description} />
            </div>
          )}
          <ArtistPost
            isShare
            post={{ ...post.post, imageHeight: post.imageHeight }}
          />
        </div>
      </div>
    </ShareContainer>
  );
};

export default Share;
