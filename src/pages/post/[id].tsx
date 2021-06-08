import React, { useContext } from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { IconButton, ThemeProvider } from '@material-ui/core';
import { FaArrowLeft, FaMoon, FaSun } from 'react-icons/fa';
import { useRouter } from 'next/router';

import CommentsSections from '@components/Comment/CommentsSections';
import Meta from '@components/SEO/Meta';
import { initializeApollo } from '@graphql/apollo/config';
import { GET_POST } from '@graphql/queries/post';
import { PostProps } from '@interfaces/Post';
import ThemeContext from '@context/theme';
import { ILoggedProfile } from '@interfaces/Profile';
import mainDarkTheme from '@styles/themes/MainDarkTheme';
import mainLightTheme from '@styles/themes/MainLightTheme';
import getLoggedUserWithNoAuth from '@ssr-functions/getLoggedUserWithNoAuth';
import formatDistanceTimePass from '@utils/formatDistanceTimePass';
import LikeButton from '@components/Post/Buttons/LikeButton';
import SavedButton from '@components/Post/Buttons/SavedButton';
import ShareButton from '@components/Post/Buttons/ShareButton';
import InteractionButtonsContainer from '@components/Post/Buttons/styles';
import PostPageContainer from './_styles';

const TextBox = dynamic(() => import('@components/TextBox'));

interface PostPageProps extends ILoggedProfile, PostProps {}

const PostPage: React.FC<PostPageProps> = ({ post, getLoggedProfile }) => {
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
          <div className="profile">
            <img
              src={process.env.NEXT_PUBLIC_API_HOST + post.artist.avatar}
              alt={post.artist.owner}
            />
            <a>
              <div>
                <strong>{post.artist.name}</strong>
                <p>@{post.artist.owner}</p>
              </div>
              <p>{formatDistanceTimePass(post.createdAt)}</p>
            </a>
          </div>
          {post.description && (
            <div className="description">
              <TextBox text={post.description} />
            </div>
          )}
          <div className="post-container">
            <div className="post">
              <img
                src="https://img.ibxk.com.br/2015/07/23/23170425700729.jpg?w=328"
                alt=""
              />
            </div>
            <InteractionButtonsContainer className="interactions">
              <SavedButton initialSaveState={post.isSaved} postID={post._id} />
              <ShareButton postID={post._id} />
            </InteractionButtonsContainer>
          </div>
          <CommentsSections profile={getLoggedProfile} postId={post._id} />
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

  const getLoggedProfile = await getLoggedUserWithNoAuth(jwtToken, client);

  return {
    props: {
      post: post.data.getPost,
      getLoggedProfile,
    },
  };
};

export default PostPage;
