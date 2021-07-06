import ProfileImage from '@components/ProfileImage';
import Link from 'next/link';
import React from 'react';
import { UseInfiniteScroll } from '../../hooks/infiniteScroll';
import { IProfile } from '../../interfaces/Profile';
import CASecondaryButton from '../../styles/components/secondaryButton';
import ProfileSimpleCardContainer from './styles';

interface ProfileSimpleCardProps {
  profile: IProfile;
  ref?: UseInfiniteScroll;
}

const ProfileSimpleCard: React.FC<ProfileSimpleCardProps> = ({ profile }) => (
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
    <CASecondaryButton
      className={`main-color ${profile.isFollowing && 'active'}`}
      type="button"
    >
      {profile.isFollowing ? 'SEGUINDO' : 'SEGUIR'}
    </CASecondaryButton>
  </ProfileSimpleCardContainer>
);

export default ProfileSimpleCard;
