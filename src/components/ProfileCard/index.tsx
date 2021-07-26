import { useMutation } from '@apollo/client';
import ProfileImage from '@components/ProfileImage';
import { FOLLOW_PROFILE, UNFOLLOW_PROFILE } from '@graphql/mutations/profile';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { UseInfiniteScroll } from '../../hooks/infiniteScroll';
import { IProfile } from '../../interfaces/Profile';
import CASecondaryButton from '../../styles/components/secondaryButton';
import ProfileSimpleCardContainer from './styles';

interface ProfileSimpleCardProps {
  profile: IProfile;
  ref?: UseInfiniteScroll;
}

const ProfileSimpleCard: React.FC<ProfileSimpleCardProps> = ({ profile }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const [follow] = useMutation(FOLLOW_PROFILE, {
    variables: { username: profile.owner },
  });
  const [unfollow] = useMutation(UNFOLLOW_PROFILE, {
    variables: { username: profile.owner },
  });

  useEffect(() => {
    setIsFollowing(profile.isFollowing);
  }, [profile.isFollowing]);

  return (
    <ProfileSimpleCardContainer>
      <Link href={`/profile/${profile.owner}`} key={profile.owner}>
        <a>
          <ProfileImage
            avatar={profile.avatar}
            alt={profile.name}
            username={profile.owner}
            className="profile-image"
          />
          <div className="profile-content">
            <div className="first-row">
              <strong>{profile.name}</strong>
              {profile.followsYou && (
                <div className="follows-you">Segue você</div>
              )}
            </div>
            <div className="second-row">
              <p>@{profile.owner}</p>
              <p className="bio">{profile.bio}</p>
            </div>
          </div>
        </a>
      </Link>
      {isFollowing ? (
        <CASecondaryButton
          type="button"
          className={`main-color ${profile.isFollowing && 'active'}`}
          onClick={() => {
            unfollow();
            setIsFollowing(false);
          }}
        >
          SEGUINDO
        </CASecondaryButton>
      ) : (
        <CASecondaryButton
          type="button"
          className={`main-color ${profile.isFollowing && 'active'}`}
          onClick={() => {
            follow();
            setIsFollowing(true);
          }}
        >
          SEGUIR
        </CASecondaryButton>
      )}
    </ProfileSimpleCardContainer>
  );
};

export default ProfileSimpleCard;
