import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';

import { AuthContext } from '@context/auth';
import { FOLLOW_PROFILE, UNFOLLOW_PROFILE } from '@graphql/mutations/profile';
import { GET_IS_FOLLOWING } from '@graphql/queries/profile';
import { IProfile } from '@interfaces/Profile';
import CreatePix from './pix/CreatePix';
import RenderPixQrCode from './pix/RenderPixQrCode';

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
        <div className="ca-buttons">
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
          <RenderPixQrCode name={getProfile.name} pix={getProfile.pix} />
        </div>
      )}
    </>
  );

  const FollowingButton = () => (
    <>
      {checkFollowButton() && isFollowing && !loading && (
        <div className="ca-buttons">
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
          <RenderPixQrCode name={getProfile.name} pix={getProfile.pix} />
        </div>
      )}
    </>
  );

  return (
    <div className="buttons-profile">
      {hasAuth && getProfile.owner === auth.user.username && (
        <div className="ca-buttons">
          <Link href="/profile/edit">
            <a>
              <button className="edit-profile" type="button">
                EDITAR PERFIL
              </button>
            </a>
          </Link>
          {getProfile.isArtist && <CreatePix pix={getProfile.pix} />}
        </div>
      )}
      <FollowingButton />
      <NotFollowingButton />
      {!hasAuth && (
        <div className="ca-buttons">
          <Link href="/login">
            <a>
              <button className="main-color" type="button">
                SEGUIR
              </button>
            </a>
          </Link>
          <RenderPixQrCode name={getProfile.name} pix={getProfile.pix} />
        </div>
      )}
    </div>
  );
};

export default ProfileButtons;
