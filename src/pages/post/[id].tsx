import React, { useContext, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import LikeButton from '@components/Post/Buttons/LikeButton';
import SavedButton from '@components/Post/Buttons/SavedButton';
import ShareButton from '@components/Post/Buttons/ShareButton';
import CAImage from '@components/CAImage';
import InteractionButtonsContainer from '@components/Post/Buttons/styles';
import CommentsSections from '@components/Comment/CommentsSections';
import NonAuthAltHeader from '@components/NonAuthAltHeader';
import OptionsMenu from '@components/Post/OptionsMenu';
import InteractionsNumbers from '@components/Post/utils/InteractionsNumbers';
import ProfileImage from '@components/ProfileImage';
import Meta from '@components/SEO/Meta';
import ThemeContext from '@context/theme';
import { initializeApollo } from '@graphql/apollo/config';
import usePostsMutations from '@hooks/postMutations';
import { GET_POST } from '@graphql/queries/post';
import { BlurImageData } from '@interfaces/Generics';
import { IGetPost, PostProps } from '@interfaces/Post';
import { ILoggedProfile } from '@interfaces/Profile';
import PostSchema from '@schemas/Post';
import getLoggedUserWithNoAuth from '@ssr-functions/getLoggedUserWithNoAuth';
import getBase64Image from '@ssr-functions/getBase64Image';
import formatDistanceTimePass from '@utils/formatDistanceTimePass';
import mediaIds from '@utils/mediaIds';
import Link from 'next/link';
import createOpmizeUrl from '@utils/createOptimizeUrl';
import PostPageContainer from './_styles';

const AudioPlayer = dynamic(() => import('@components/AudioPlayer'), {
  ssr: false,
});
const TextBox = dynamic(() => import('@components/TextBox'));

interface PostPageProps extends ILoggedProfile, PostProps, BlurImageData {}

const PostPage: React.FC<PostPageProps> = ({
  post,
  getLoggedProfile,
  blurDataUrl,
}) => {
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
        <figure className="post-image">
          <CAImage
            alt={post.alt}
            blurDataURL={blurDataUrl}
            quality={100}
            width="600px"
            height={post.imageHeight}
            placeholder="blur"
            objectFit="contain"
            src={createOpmizeUrl(post.body)}
          />
        </figure>
      );
    }

    if (mediaId === mediaIds.audio) {
      return (
        <AudioPlayer
          audio={post.body}
          title={post.title}
          darkColor={post.darkColor}
          lightColor={post.lightColor}
          thumbnail={post.thumbnail || '/assets/audio-placeholder.svg'}
          blurDataUrl={blurDataUrl}
        />
      );
    }

    if (mediaId === mediaIds.text) {
      return (
        <div className="post-text">
          <TextBox text={post.description} alwaysShowMore />
        </div>
      );
    }

    return <p>erro</p>;
  };

  const handleSEOImage = () => {
    switch (post.mediaId) {
      case mediaIds.audio:
        return (
          post.thumbnail ||
          post.artist.avatar ||
          `${process.env.NEXT_PUBLIC_HOST}/CardSEO.png`
        );
      case mediaIds.image:
        return post.body;
      default:
        return (
          post.artist.avatar || `${process.env.NEXT_PUBLIC_HOST}/CardSEO.png`
        );
    }
  };

  useEffect(() => {
    setLikesCount(post.likesCount);
  }, [post.likesCount]);

  return (
    <>
      <PostPageContainer>
        <Meta
          description={`Post de ${post.artist.name} ${
            post.description && `- ${post.description.substring(0, 100)}`
          }`}
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
                <ProfileImage
                  alt={post.artist.owner}
                  avatar={post.artist.avatar}
                  username={post.artist.owner}
                  className="author-image"
                />
                <Link href={`/profile/${post.artist.owner}`}>
                  <a>
                    <div>
                      <strong>{post.artist.name}</strong>
                      <p>@{post.artist.owner}</p>
                    </div>
                    <p>{formatDistanceTimePass(post.createdAt)}</p>
                  </a>
                </Link>
              </div>
              <OptionsMenu
                deletePost={handleDeletePost}
                id={post._id}
                username={post.artist.owner}
              />
            </div>
            {post.description && post.mediaId !== mediaIds.text && (
              <div className="description">
                <TextBox text={post.description} />
              </div>
            )}
          </div>
          {(post.body || post.mediaId === mediaIds.text) && (
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
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params;
  const { jwtToken } = context.req.cookies;

  const client = initializeApollo(null, jwtToken);

  const post = await client.query<IGetPost>({
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

  const postData = post.data.getPost;

  const managePost = () => {
    switch (postData.mediaId) {
      case mediaIds.audio:
        return (
          postData.thumbnail ||
          `${process.env.NEXT_PUBLIC_HOST}/assets/audio-placeholder.svg`
        );
      case mediaIds.image:
        return postData.body;
      default:
        return '';
    }
  };

  const base64 = await getBase64Image(managePost);

  return {
    props: {
      post: post.data.getPost,
      getLoggedProfile,
      blurDataUrl: base64,
    },
  };
};

export default PostPage;
