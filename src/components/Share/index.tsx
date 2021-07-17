import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ErrorPost, PostProps } from '@interfaces/Post';
import AuthorInfo from '@components/Post/utils/AuthorInfo';
import ArtistPost from '@components/Post/ArtistPost';
import { DELETE_SHARE } from '@graphql/mutations/share';
import TextBox from '@components/TextBox';
import ShareContainer from './styles';
import NullPost from './NullPost';

const Share: React.FC<PostProps> = ({ post }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [deleteShare] = useMutation(DELETE_SHARE);

  const isNullPost = (post.post as unknown) as ErrorPost;

  return (
    <>
      {!isDeleted && (
        <ShareContainer>
          {isNullPost.error ? (
            <NullPost />
          ) : (
            <div className="share">
              <div className="share-info">
                <AuthorInfo
                  createdAt={post.createdAt}
                  postID={post._id}
                  profile={post.post.artist}
                  handleDeletePost={() => {
                    deleteShare({ variables: { id: post._id } });
                    setIsDeleted(true);
                  }}
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
          )}
        </ShareContainer>
      )}
    </>
  );
};

export default Share;
