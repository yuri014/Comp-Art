/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { gql, useQuery } from '@apollo/client';

import Header from '../../components/Header';
import MobileFooter from '../../components/MobileFooter';
import { initializeApollo } from '../../graphql/apollo/config';
import { GET_POST } from '../../graphql/queries/post';
import { IPost, PostProps } from '../../interfaces/Post';
import AudioPost from '../../components/Post/AudioPost';
import ImagePost from '../../components/Post/ImagePost';
import PostPageContainer from '../../styles/pages/post/styles';

interface PostQuery {
  getPost: IPost;
}

const GET_IS_LIKED = gql`
  query GetPost($id: ID!) {
    getPost(id: $id) {
      isLiked
    }
  }
`;

const Post: React.FC<PostProps> = ({ post }) => {
  const [postData, setPostData] = useState<IPost>(post);
  const { data } = useQuery<PostQuery>(GET_IS_LIKED, {
    variables: { id: post._id },
  });

  useEffect(() => {
    if (data) {
      const newPost = post;
      newPost.isLiked = data.getPost.isLiked;
      setPostData({ ...newPost });
    }
  }, [data, post]);

  return (
    <PostPageContainer>
      <Header />
      <main>
        <div className="container">
          {postData.isAudio ? (
            <AudioPost post={postData} />
          ) : (
            <ImagePost post={postData} />
          )}
        </div>
      </main>
      <MobileFooter />
    </PostPageContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params;

  const client = initializeApollo();

  const post = await client.query({
    query: GET_POST,
    variables: { id },
    errorPolicy: 'ignore',
  });

  if (!post.data.getPost) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: { ...post.data.getPost, _id: id },
    },
  };
};

export default Post;
