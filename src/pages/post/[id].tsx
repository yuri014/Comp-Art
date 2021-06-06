import React from 'react';
import { GetServerSideProps } from 'next';
import { IconButton, ThemeProvider } from '@material-ui/core';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';

import CommentsSections from '@components/Comment/CommentsSections';
import Meta from '@components/SEO/Meta';
import { initializeApollo } from '@graphql/apollo/config';
import { GET_POST } from '@graphql/queries/post';
import { PostProps } from '@interfaces/Post';
import PostPageContainer from '@styles/pages/post/styles';
import mainTheme from '@styles/themes/MainTheme';
import Post from '@components/Post';
import usePostsMutations from '@hooks/postMutations';
import ArtistPost from '@components/Post/ArtistPost';

const PostPage: React.FC<PostProps> = ({ post }) => {
  const router = useRouter();

  return (
    <ThemeProvider theme={mainTheme}>
      <PostPageContainer>
        <Meta
          description={`Post de ${post.artist.name}`}
          keywords={`comp-art, post, artista, divulgação, ${post.artist.name}`}
          title={`Post - ${post.artist.name}`}
          uri={`/post/${post._id}`}
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
          <Post useInteractions={usePostsMutations} post={post}>
            <ArtistPost post={post} />
          </Post>
        </main>
        <CommentsSections postId={post._id} />
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
      post: post.data.getPost,
    },
  };
};

export default PostPage;
