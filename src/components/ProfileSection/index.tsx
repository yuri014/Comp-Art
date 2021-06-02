import React, { useContext, useState } from 'react';
import Link from 'next/link';

import { useMutation, useQuery } from '@apollo/client';
import { AuthContext } from '@context/auth';
import { FOLLOW_PROFILE, UNFOLLOW_PROFILE } from '@graphql/mutations/profile';
import { IProfile } from '@interfaces/Profile';
import CAImage from '@components/CAImage';
import { GET_IS_FOLLOWING } from '@graphql/queries/profile';
import formatDate from '@utils/formatDate';
import ProfileSectionContainer from './_styles';

interface ProfileProps {
  getProfile: IProfile;
}

const ProfileSection: React.FC<ProfileProps> = ({ getProfile }) => {
  const auth = useContext(AuthContext);
  const [followersCount, setFollowersCount] = useState(getProfile.followers);
  const [follow] = useMutation(FOLLOW_PROFILE);
  const [unfollow] = useMutation(UNFOLLOW_PROFILE);

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
    <ProfileSectionContainer>
      <div className="avatar-profile">
        <CAImage className="profile-image" image={getProfile.avatar} />
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
          <div>
            <p>{getProfile.following}</p>
            <p>Seguindo</p>
          </div>
          <div>
            <p>{followersCount}</p>
            <p>Seguidores</p>
          </div>
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
  );
};

export default ProfileSection;
