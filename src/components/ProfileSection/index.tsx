import React, { useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import { gql, useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';

import { AuthContext } from '@context/auth';
import { FOLLOW_PROFILE, UNFOLLOW_PROFILE } from '@graphql/mutations/profile';
import { IProfile } from '@interfaces/Profile';
import { GET_IS_FOLLOWING } from '@graphql/queries/profile';
import { MODAL_PROFILE } from '@graphql/fragments/profile';
import formatDate from '@utils/formatDate';
import ProfileSectionContainer from './_styles';

const ModalProfile = dynamic(() => import('@components/ModalProfile'));
const FullScreenImage = dynamic(() => import('@components/FullScreenImage'));

interface ProfileProps {
  getProfile: IProfile;
}

const GET_FOLLOWERS = gql`
  ${MODAL_PROFILE}
  query GetFollowers($offset: Int!, $username: String!) {
    getFollowers(offset: $offset, username: $username) {
      ...ModalProfile
    }
  }
`;

const GET_FOLLOWING = gql`
  ${MODAL_PROFILE}
  query GetFollowing($offset: Int!, $username: String!) {
    getFollowing(offset: $offset, username: $username) {
      ...ModalProfile
    }
  }
`;

const followerQuery = {
  queryResult: 'getFollowers',
  query: GET_FOLLOWERS,
};

const followingQuery = {
  queryResult: 'getFollowing',
  query: GET_FOLLOWING,
};

const ProfileSection: React.FC<ProfileProps> = ({ getProfile }) => {
  const auth = useContext(AuthContext);
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [followersCount, setFollowersCount] = useState(getProfile.followers);
  const [follow] = useMutation(FOLLOW_PROFILE);
  const [unfollow] = useMutation(UNFOLLOW_PROFILE);
  const [modalPayload, setModalPayload] = useState(followerQuery);

  const [isFollowing, setIsFollowing] = useState(false);
  const { data: getIsFollowing, loading } = useQuery(GET_IS_FOLLOWING, {
    variables: {
      id: getProfile._id,
    },
    onCompleted: () => setIsFollowing(getIsFollowing.getIsFollowing),
  });

  const hasAuth = auth.user;
  const checkFollowButton = () =>
    hasAuth && getProfile.owner !== auth.user.username;

  return (
    <>
      <ProfileSectionContainer>
        <div className="avatar-profile">
          <button
            className="profile-image"
            type="button"
            onClick={() => setIsImageFullScreen(true)}
          >
            <img
              src={process.env.NEXT_PUBLIC_API_HOST + getProfile.avatar}
              alt={getProfile.name}
            />
          </button>
          <p>LEVEL {getProfile.level}</p>
        </div>
        <div className="profile">
          <div>
            <h1 title={getProfile.name}>{getProfile.name}</h1>
            <h2>@{getProfile.owner}</h2>
          </div>
          <div className="profile-numbers">
            <div>
              {getProfile.sharedPostCount !== null && (
                <p>{getProfile.sharedPostCount}</p>
              )}
              {getProfile.postCount !== null && <p>{getProfile.postCount}</p>}
              <p>Publicações </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setModalShow(true);
                setModalPayload(followingQuery);
              }}
            >
              <p>{getProfile.following}</p>
              <p>Seguindo</p>
            </button>
            <button
              type="button"
              onClick={() => {
                setModalShow(true);
                setModalPayload(followerQuery);
              }}
            >
              <p>{followersCount}</p>
              <p>Seguidores</p>
            </button>
          </div>
        </div>
        <div className="buttons-profile">
          <button type="button" className="sponsorship">
            PATROCINAR
          </button>
          {hasAuth && getProfile.owner === auth.user.username && (
            <Link href="/profile/edit">
              <a>
                <button className="edit-profile" type="button">
                  EDITAR PERFIL
                </button>
              </a>
            </Link>
          )}

          {checkFollowButton() && isFollowing && !loading && (
            <button
              className="main-color"
              type="button"
              onClick={() => {
                unfollow({
                  variables: { username: getProfile.owner },
                });
                setIsFollowing(false);
                setFollowersCount(followersCount - 1);
              }}
            >
              SEGUINDO
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
              SEGUIR
            </button>
          )}
          {!hasAuth && (
            <button className="main-color" type="button">
              SEGUIR
            </button>
          )}
        </div>
        {getProfile.bio && (
          <div className="bio">
            <p>{getProfile.bio}</p>
          </div>
        )}
        <div className="joined">
          <p>Ingressou em {formatDate(getProfile.createdAt)}</p>
        </div>
      </ProfileSectionContainer>
      {modalShow && (
        <ModalProfile
          onHide={() => setModalShow(false)}
          queryResult={modalPayload.queryResult}
          query={modalPayload.query}
          variable={{ username: getProfile.owner }}
        />
      )}
      {isImageFullScreen && (
        <FullScreenImage
          img={process.env.NEXT_PUBLIC_API_HOST + getProfile.avatar}
          onClose={() => setIsImageFullScreen(false)}
        />
      )}
    </>
  );
};

export default ProfileSection;
