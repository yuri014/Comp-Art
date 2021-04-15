import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { gql, useQuery } from '@apollo/client';

import { FaArrowLeft } from 'react-icons/fa';

import { useRouter } from 'next/router';
import { IconButton, ThemeProvider } from '@material-ui/core';
import { initializeApollo } from '../../graphql/apollo/config';
import { GET_POST } from '../../graphql/queries/post';
import { IPost, PostProps } from '../../interfaces/Post';
import PostPageContainer from '../../styles/pages/post/styles';
import Meta from '../../components/SEO/Meta';
import CommentsSections from '../../components/Comment/CommentsSections';
import mainTheme from '../../styles/themes/MainTheme';

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
  const router = useRouter();

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
    <ThemeProvider theme={mainTheme}>
      <PostPageContainer>
        <Meta
          description={`Post de ${postData.artist.name}`}
          keywords={`comp-art, post, artista, divulgação, ${postData.artist.name}`}
          title={`Post - ${postData.artist.name}`}
          uri={`/post/${postData._id}`}
        />
        <main>
          <nav>
            <IconButton
              onClick={() => router.back()}
              aria-label="Voltar"
              color="primary"
            >
              <FaArrowLeft />
            </IconButton>
          </nav>
          <Post post={postData} />
        </main>
        <CommentsSections postId={postData._id} />
      </PostPageContainer>
    </ThemeProvider>
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
