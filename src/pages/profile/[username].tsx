import React, { useCallback, useContext, useRef, useState } from 'react';
import { QueryResult, useMutation, useQuery } from '@apollo/client';
import {
  FaBandcamp,
  FaDeviantart,
  FaFacebook,
  FaLink,
  FaPinterest,
  FaSoundcloud,
  FaTwitter,
} from 'react-icons/fa';
import { SiWattpad } from 'react-icons/si';
import { GetServerSideProps } from 'next';
import Skeleton from '@material-ui/lab/Skeleton';
import dynamic from 'next/dynamic';

import Header from '../../components/Header';
import MobileFooter from '../../components/MobileFooter';
import { GET_IS_FOLLOWING, GET_PROFILE } from '../../graphql/queries/profile';
import { IProfile } from '../../interfaces/Profile';
import { IPost } from '../../interfaces/Post';
import ProfileContainer from '../../styles/pages/profile/style';
import { AuthContext } from '../../context/auth';
import {
  FOLLOW_PROFILE,
  UNFOLLOW_PROFILE,
} from '../../graphql/mutations/profile';
import { initializeApollo } from '../../graphql/apollo/config';
import { GET_PROFILE_POSTS } from '../../graphql/queries/post';
import Post from '../../components/Post';
import SkeletonPost from '../../components/Post/SkeletonPost';
import Meta from '../../components/SEO/Meta';

const FullScreenImage = dynamic(
  () => import('../../components/FullScreenImage'),
);

interface ProfileProps {
  username: string;
  profile: QueryResult<
    { getProfile: IProfile },
    {
      username: string;
    }
  >;
}

const Profile: React.FC<ProfileProps> = ({ username, profile }) => {
  const auth = useContext(AuthContext);
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const { data: getIsFollowing, loading } = useQuery(GET_IS_FOLLOWING, {
    variables: {
      username,
    },
    onCompleted: () => setIsFollowing(getIsFollowing.getIsFollowing),
  });

  const [follow] = useMutation(FOLLOW_PROFILE);
  const [unfollow] = useMutation(UNFOLLOW_PROFILE);

  const [hasMore, setHasMore] = useState(false);
  const observer = useRef(null);
  const { data, error, loading: loadingPost, fetchMore } = useQuery<{
    getProfilePosts: Array<IPost>;
  }>(GET_PROFILE_POSTS, {
    variables: { offset: 0, username },
    ssr: true,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  const lastPostRef = useCallback(
    node => {
      if (!data.getProfilePosts) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !hasMore) {
          fetchMore({
            variables: { offset: data.getProfilePosts.length },
          }).then(newPosts => {
            if (newPosts.data.getProfilePosts.length < 3) {
              setHasMore(true);
            }
          });
        }
      });

      if (node) observer.current.observe(node);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  const { getProfile }: { getProfile: IProfile } = profile.data;

  const hasAuth = auth.user;

  const [followersCount, setFollowersCount] = useState(getProfile.followers);

  const checkFollowButton = () =>
    hasAuth && getProfile.owner !== auth.user.username;

  const formatMetaHashtags = () =>
    `${getProfile.hashtags
      .slice(0, -1)
      .join(', ')
      .replace(/#/g, '')} e ${getProfile.hashtags
      .slice(-1)
      .join('')
      .replace('#', '')}`;

  return (
    <ProfileContainer>
      <Meta
        title={`${getProfile.owner} - Perfil`}
        description={`${getProfile.owner} é um ${
          getProfile.isArtist
            ? `artista que produz e/ou se interessa por ${formatMetaHashtags()}`
            : `apreciador de ${formatMetaHashtags()}`
        }`}
        keywords={`${getProfile.owner}, ${
          getProfile.name
        }, ${formatMetaHashtags()}, ${getProfile.bio}, ${
          getProfile.isArtist ? 'artista' : 'apreciador'
        }`}
        uri={`profile/${getProfile.owner}`}
      />
      <Header />
      <main>
        <div className="cover-profile">
          {getProfile.coverImage ? (
            <img src={getProfile.coverImage} alt="Capa do perfil" />
          ) : (
            <div className="holder" />
          )}
        </div>
        <div className="container">
          <div
            className="avatar-profile"
            onClick={() => setIsImageFullScreen(true)}
            onKeyDown={() => setIsImageFullScreen(true)}
            onBlur={() => setIsImageFullScreen(false)}
            role="button"
            tabIndex={0}
          >
            <img
              src={getProfile.avatar || '../profile.jpg'}
              alt="Imagem do perfil"
            />
          </div>
          <div className="edit-profile">
            {hasAuth && getProfile.owner === auth.user.username && (
              <button type="button">Editar perfil</button>
            )}

            {loading && <Skeleton width={60} height={40} />}

            {checkFollowButton() && isFollowing && !loading && (
              <button
                type="button"
                onClick={() => {
                  unfollow({
                    variables: { username: getProfile.owner },
                  });
                  setIsFollowing(false);
                  setFollowersCount(followersCount - 1);
                }}
              >
                Deixar de Seguir
              </button>
            )}
            {checkFollowButton() && !isFollowing && !loading && (
              <button
                type="button"
                onClick={() => {
                  follow({
                    variables: { username: getProfile.owner },
                  });
                  setIsFollowing(true);
                  setFollowersCount(followersCount + 1);
                }}
              >
                Seguir
              </button>
            )}
            {!hasAuth && <button type="button">Seguir</button>}
          </div>
          <section>
            <div className="profile">
              <div>
                <h1>{getProfile.name}</h1>
                <h2>@{getProfile.owner}</h2>
              </div>
              <div>
                <p>
                  Level <span className="level">{getProfile.level}</span>
                </p>
                {getProfile.sharedPostCount !== null && (
                  <p>Publicações: {getProfile.sharedPostCount}</p>
                )}
                {getProfile.postCount !== null && (
                  <p>Publicações: {getProfile.postCount}</p>
                )}
              </div>
              <div className="profile-follows">
                <p>Seguindo: {getProfile.following}</p>
                <p>Seguidores: {followersCount}</p>
              </div>
            </div>
            <div className="mobile-profile-follows">
              <p>Seguindo: {getProfile.following}</p>
              <p>Seguidores: {followersCount}</p>
            </div>
            {getProfile.bio && (
              <div className="bio">
                <p>{getProfile.bio}</p>
              </div>
            )}
            <div className="profile-links">
              {getProfile.links.soundcloud && (
                <a
                  href={`http://soundcloud.com/${getProfile.links.soundcloud}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaSoundcloud className="soundcloud-icon" />
                </a>
              )}
              {getProfile.links.twitter && (
                <a
                  href={`http://twitter.com/${getProfile.links.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="twitter-icon" />
                </a>
              )}
              {getProfile.links.deviantart && (
                <a
                  href={`http://deviantart.com/${getProfile.links.deviantart}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaDeviantart className="deviantart-icon" />
                </a>
              )}
              {getProfile.links.bandcamp && (
                <a
                  href={`http://${getProfile.links.bandcamp}.bandcamp.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaBandcamp className="bandcamp-icon" />
                </a>
              )}
              {getProfile.links.wattpad && (
                <a
                  href={`http://wattpad.com/user/${getProfile.links.wattpad}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiWattpad className="wattpad-icon" />
                </a>
              )}
              {getProfile.links.facebook && (
                <a
                  href={`http://facebook.com/${getProfile.links.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="facebook-icon" />
                </a>
              )}
              {getProfile.links.pinterest && (
                <a
                  href={`http://pinterest.com/${getProfile.links.pinterest}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaPinterest className="pinterest-icon" />
                </a>
              )}
              {getProfile.links.customLink && (
                <a
                  href={getProfile.links.customLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLink className="primary-icon" />
                </a>
              )}
            </div>
          </section>
        </div>
      </main>
      <div className="container">
        <section className="profile-posts">
          {loadingPost || error ? (
            <SkeletonPost />
          ) : (
            data.getProfilePosts.map((post, index) => {
              if (data.getProfilePosts.length === index + 1) {
                return (
                  <div
                    key={`${post.artist}_${post.createdAt}`}
                    ref={lastPostRef}
                  >
                    <Post post={post} />
                  </div>
                );
              }
              return (
                <div key={`${post.artist}_${post.createdAt}`}>
                  <Post post={post} />
                </div>
              );
            })
          )}
        </section>
      </div>
      <MobileFooter />
      {isImageFullScreen && (
        <FullScreenImage
          img={getProfile.avatar || '/profile.jpg'}
          onClose={() => setIsImageFullScreen(false)}
        />
      )}
    </ProfileContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { username } = context.params;

  const client = initializeApollo();

  const profile = await client.query({
    query: GET_PROFILE,
    variables: { username },
    errorPolicy: 'ignore',
  });

  if (!profile.data.getProfile) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      username,
      profile,
    },
  };
};

export default Profile;
