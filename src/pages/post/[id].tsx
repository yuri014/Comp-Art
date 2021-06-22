import React, { useContext, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { ThemeProvider } from '@material-ui/core';

import LikeButton from '@components/Post/Buttons/LikeButton';
import SavedButton from '@components/Post/Buttons/SavedButton';
import ShareButton from '@components/Post/Buttons/ShareButton';
import CAImage from '@components/CAImage';
import InteractionButtonsContainer from '@components/Post/Buttons/styles';
import CommentsSections from '@components/Comment/CommentsSections';
import NonAuthAltHeader from '@components/NonAuthAltHeader';
import OptionsMenu from '@components/Post/OptionsMenu';
import InteractionsNumbers from '@components/Post/utils/InteractionsNumbers';
import Meta from '@components/SEO/Meta';
import ThemeContext from '@context/theme';
import { initializeApollo } from '@graphql/apollo/config';
import usePostsMutations from '@hooks/postMutations';
import { GET_POST } from '@graphql/queries/post';
import { PostProps } from '@interfaces/Post';
import { ILoggedProfile } from '@interfaces/Profile';
import PostSchema from '@schemas/Post';
import mainDarkTheme from '@styles/themes/MainDarkTheme';
import mainLightTheme from '@styles/themes/MainLightTheme';
import getLoggedUserWithNoAuth from '@ssr-functions/getLoggedUserWithNoAuth';
import formatDistanceTimePass from '@utils/formatDistanceTimePass';
import mediaIds from '@utils/mediaIds';
import PostPageContainer from './_styles';

const AudioPlayer = dynamic(() => import('@components/AudioPlayer'), {
  ssr: false,
});
const TextBox = dynamic(() => import('@components/TextBox'));

interface PostPageProps extends ILoggedProfile, PostProps {}

const PostPage: React.FC<PostPageProps> = ({ post, getLoggedProfile }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [likesCount, setLikesCount] = useState<number>();

  const [handleDeletePost, dislikePost, likePost] = usePostsMutations(
    post._id,
    () => {
      setLikesCount(likesCount - 1);
    },
    () => {
      setLikesCount(likesCount + 1);
    },
  );

  const HandlePost = ({ mediaId }: { mediaId: number }) => {
    if (mediaId === mediaIds.image) {
      return (
        <CAImage
          image={post.body}
          options={{
            alt: post.alt,
            className: 'post-image',
            loading: 'lazy',
          }}
        />
      );
    }

    if (mediaId === mediaIds.audio) {
      return (
        <AudioPlayer
          audio={post.body}
          title={post.title}
          darkColor={post.darkColor}
          lightColor={post.lightColor}
          thumbnail={post.thumbnail}
        />
      );
    }

    return <p>erro</p>;
  };

  const handleSEOImage = () => {
    switch (post.mediaId) {
      case mediaIds.audio:
        return process.env.NEXT_PUBLIC_API_HOST + post.thumbnail;
      case mediaIds.image:
        return process.env.NEXT_PUBLIC_API_HOST + post.body;
      default:
        return `${process.env.NEXT_PUBLIC_HOST}/CardSEO.png`;
    }
  };

  useEffect(() => {
    setLikesCount(post.likesCount);
  }, [post.likesCount]);

  return (
    <ThemeProvider theme={isDarkMode ? mainDarkTheme : mainLightTheme}>
      <PostPageContainer>
        <Meta
          description={`Post de ${post.artist.name}`}
          keywords={`comp-art, post, artista, divulgação, ${post.artist.name}`}
          title={`Post - ${post.artist.name}`}
          uri={`post/${post._id}`}
          seoImage={handleSEOImage()}
        />
        <NonAuthAltHeader isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <main>
          <div id="author">
            <div className="profile">
              <div className="author-info">
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
              <OptionsMenu
                deletePost={handleDeletePost}
                id={post._id}
                username={post.artist.owner}
              />
            </div>
            {post.description && (
              <div className="description">
                <TextBox text={post.description} />
              </div>
            )}
          </div>
          {post.body && (
            <div className="post">
              <HandlePost mediaId={post.mediaId} />
            </div>
          )}
          <div id="comments">
            <div className="interactions-numbers">
              <InteractionsNumbers likesCount={likesCount} post={post} />
            </div>
            <InteractionButtonsContainer className="interactions">
              <LikeButton
                dislikePost={dislikePost}
                likePost={likePost}
                initialLikeState={post.isLiked}
              />
              <SavedButton initialSaveState={post.isSaved} postID={post._id} />
              <ShareButton postID={post._id} />
            </InteractionButtonsContainer>
            {getLoggedProfile && (
              <CommentsSections profile={getLoggedProfile} postId={post._id} />
            )}
          </div>
        </main>
      </PostPageContainer>
      <PostSchema post={post} />
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
