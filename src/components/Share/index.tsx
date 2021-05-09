import React from 'react';

import { PostProps } from '@interfaces/Post';
import AuthorInfo from '@components/Post/utils/AuthorInfo';
import ArtistPost from '@components/Post/ArtistPost';
import publishDate from '@utils/publishDate';
import Link from 'next/link';
import ShareContainer from './styles';

const Share: React.FC<PostProps> = ({ post }) => (
  <Link href={`/post/${post._id}`}>
    <a>
      <ShareContainer>
        <div className="share">
          <div className="share-info">
            <AuthorInfo
              postID={post._id}
              profile={post.post.artist}
              handleDeletePost={() => console.log('a')}
            />
          </div>
          <div className="share-content">
            <ArtistPost post={post.post} />
            <div className="date">
              <p>{publishDate(post.post.createdAt)}</p>
            </div>
          </div>
        </div>
      </ShareContainer>
    </a>
  </Link>
);

export default Share;
