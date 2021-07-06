import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { gql } from '@apollo/client';

import { IProfile } from '@interfaces/Profile';
import { MODAL_PROFILE } from '@graphql/fragments/profile';
import formatDate from '@utils/formatDate';
import ProfileImage from '@components/ProfileImage';
import ProfileSectionContainer from './_styles';
import ProfileButtons from './ProfileButtons';

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
  title: 'Seguidores',
};

const followingQuery = {
  queryResult: 'getFollowing',
  query: GET_FOLLOWING,
  title: 'Seguindo',
};

const ProfileSection: React.FC<ProfileProps> = ({ getProfile }) => {
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [modalPayload, setModalPayload] = useState(followerQuery);

  useEffect(() => {
    setFollowersCount(getProfile.followers);
  }, [getProfile.followers]);

  return (
    <>
      <ProfileSectionContainer>
        <div className="avatar-profile">
          {getProfile.avatar ? (
            <button
              className="profile-image"
              type="button"
              onClick={() => setIsImageFullScreen(true)}
              onKeyDown={() => setIsImageFullScreen(true)}
              onBlur={() => setIsImageFullScreen(false)}
            >
              <img
                src={process.env.NEXT_PUBLIC_API_HOST + getProfile.avatar}
                alt={getProfile.name}
              />
            </button>
          ) : (
            <ProfileImage
              className="profile-image"
              alt={getProfile.name}
              avatar={getProfile.avatar}
              username={getProfile.owner}
            />
          )}
          <p className="level-badge">LEVEL {getProfile.level}</p>
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
        <ProfileButtons
          getProfile={getProfile}
          setFollowersCount={setFollowersCount}
        />
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
          variable={{ username: getProfile.owner }}
          payload={modalPayload}
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
