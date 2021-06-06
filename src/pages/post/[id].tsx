import React, { useContext } from 'react';
import { GetServerSideProps } from 'next';
import { IconButton, ThemeProvider } from '@material-ui/core';
import { FaArrowLeft, FaMoon, FaSun } from 'react-icons/fa';
import { useRouter } from 'next/router';

import CommentsSections from '@components/Comment/CommentsSections';
import Meta from '@components/SEO/Meta';
import { initializeApollo } from '@graphql/apollo/config';
import { GET_POST } from '@graphql/queries/post';
import { PostProps } from '@interfaces/Post';
import Post from '@components/Post';
import usePostsMutations from '@hooks/postMutations';
import ArtistPost from '@components/Post/ArtistPost';
import ThemeContext from '@context/theme';
import mainDarkTheme from '@styles/themes/MainDarkTheme';
import mainLightTheme from '@styles/themes/MainLightTheme';
import PostPageContainer from './_styles';

const PostPage: React.FC<PostProps> = ({ post }) => {
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <ThemeProvider theme={isDarkMode ? mainDarkTheme : mainLightTheme}>
      <PostPageContainer>
        <Meta
          description={`Post de ${post.artist.name}`}
          keywords={`comp-art, post, artista, divulgação, ${post.artist.name}`}
          title={`Post - ${post.artist.name}`}
          uri={`/post/${post._id}`}
        />
        <header>
          <nav>
            <IconButton
              onClick={() => router.back()}
              aria-label="Voltar"
              color="secondary"
            >
              <FaArrowLeft />
            </IconButton>
            <IconButton
              color="secondary"
              type="button"
              aria-label={`Mudar para modo ${!isDarkMode ? 'Escuro' : 'Claro'}`}
              onClick={() => toggleTheme()}
            >
              {!isDarkMode ? <FaMoon /> : <FaSun />}
            </IconButton>
          </nav>
        </header>
        <main>
          <div className="post-container">
            <img
              src="https://img.ibxk.com.br/2015/07/23/23170425700729.jpg?w=328"
              alt=""
            />
          </div>
          <CommentsSections postId={post._id} />
        </main>
      </PostPageContainer>
    </ThemeProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params;
  const { jwtToken } = context.req.cookies;

  const client = initializeApollo(null, jwtToken);

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
