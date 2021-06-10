import React, { useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { IconButton, ThemeProvider } from '@material-ui/core';
import { FaArrowLeft, FaMoon, FaSun } from 'react-icons/fa';
import { useRouter } from 'next/router';

import LikeButton from '@components/Post/Buttons/LikeButton';
import SavedButton from '@components/Post/Buttons/SavedButton';
import ShareButton from '@components/Post/Buttons/ShareButton';
import CAImage from '@components/CAImage';
import InteractionButtonsContainer from '@components/Post/Buttons/styles';
import CommentsSections from '@components/Comment/CommentsSections';
import Meta from '@components/SEO/Meta';
import ThemeContext from '@context/theme';
import { initializeApollo } from '@graphql/apollo/config';
import usePostsMutations from '@hooks/postMutations';
import { GET_POST } from '@graphql/queries/post';
import { PostProps } from '@interfaces/Post';
import { ILoggedProfile } from '@interfaces/Profile';
import mainDarkTheme from '@styles/themes/MainDarkTheme';
import mainLightTheme from '@styles/themes/MainLightTheme';
import getLoggedUserWithNoAuth from '@ssr-functions/getLoggedUserWithNoAuth';
import formatDistanceTimePass from '@utils/formatDistanceTimePass';
import PostPageContainer from './_styles';

const AudioPlayer = dynamic(() => import('@components/AudioPlayer'), {
  ssr: false,
});
const TextBox = dynamic(() => import('@components/TextBox'));

interface PostPageProps extends ILoggedProfile, PostProps {}

const PostPage: React.FC<PostPageProps> = ({ post, getLoggedProfile }) => {
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [likesCount, setLikesCount] = useState<number>();

  const [, dislikePost, likePost] = usePostsMutations(
    post._id,
    () => {
      setLikesCount(likesCount - 1);
    },
    () => {
      setLikesCount(likesCount + 1);
    },
  );

  const HandlePost = ({ mediaId }: { mediaId: number }) => {
    const medias = {
      image: 1,
      audio: 2,
      video: 3,
      text: 4,
    };

    if (mediaId === medias.image) {
      return (
        <CAImage image={post.body} alt={post.alt} className="post-image" />
      );
    }

    if (mediaId === medias.audio) {
      return (
        <AudioPlayer
          audio={post.body}
          darkColor={post.darkColor}
          lightColor={post.lightColor}
          thumbnail={post.thumbnail}
        />
      );
    }

    return <p>erro</p>;
  };

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
            {post.body && (
              <div className="post">
                <HandlePost mediaId={post.mediaId} />
              </div>
            )}
            <InteractionButtonsContainer className="interactions">
              <LikeButton
                dislikePost={dislikePost}
                likePost={likePost}
                initialLikeState={post.isLiked}
              />
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
