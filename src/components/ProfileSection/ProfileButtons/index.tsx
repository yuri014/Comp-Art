import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';

import { AuthContext } from '@context/auth';
import { FOLLOW_PROFILE, UNFOLLOW_PROFILE } from '@graphql/mutations/profile';
import { GET_IS_FOLLOWING } from '@graphql/queries/profile';
import { IProfile } from '@interfaces/Profile';

interface ProfileButtonsProps {
  getProfile: IProfile;
  setFollowersCount: React.Dispatch<React.SetStateAction<number>>;
}

const ProfileButtons: React.FC<ProfileButtonsProps> = ({
  getProfile,
  setFollowersCount,
}) => {
  const auth = useContext(AuthContext);
  const hasAuth = auth.user;
  const [follow] = useMutation(FOLLOW_PROFILE);
  const [unfollow] = useMutation(UNFOLLOW_PROFILE);

  const [isFollowing, setIsFollowing] = useState(false);
  const { data: getIsFollowing, loading } = useQuery(GET_IS_FOLLOWING, {
    variables: {
      id: getProfile._id,
    },
    onCompleted: () => setIsFollowing(getIsFollowing.getIsFollowing),
  });

  const checkFollowButton = () =>
    hasAuth && getProfile.owner !== auth.user.username;

  const NotFollowingButton = () => (
    <>
      {checkFollowButton() && !isFollowing && !loading && (
        <button
          type="button"
          onClick={() => {
            follow({
              variables: { username: getProfile.owner },
            });
            setIsFollowing(true);
            setFollowersCount(prevState => prevState + 1);
          }}
        >
          SEGUIR
        </button>
      )}
    </>
  );

  const FollowingButton = () => (
    <>
      {checkFollowButton() && isFollowing && !loading && (
        <button
          className="main-color"
          type="button"
          onClick={() => {
            unfollow({
              variables: { username: getProfile.owner },
            });
            setIsFollowing(false);
            setFollowersCount(prevState => prevState - 1);
          }}
        >
          SEGUINDO
        </button>
      )}
    </>
  );

  return (
    <div className="buttons-profile">
      {hasAuth && getProfile.owner === auth.user.username && (
        <Link href="/profile/edit">
          <a>
            <button className="edit-profile" type="button">
              EDITAR PERFIL
            </button>
          </a>
        </Link>
      )}
      <FollowingButton />
      <NotFollowingButton />
      {!hasAuth && (
        <Link href="/login">
          <a>
            <button className="main-color" type="button">
              SEGUIR
            </button>
          </a>
        </Link>
      )}
    </div>
  );
};

export default ProfileButtons;
