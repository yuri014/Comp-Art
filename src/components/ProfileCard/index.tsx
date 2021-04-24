import Link from 'next/link';
import React from 'react';
import { UseInfiniteScroll } from '../../hooks/infiniteScroll';
import { IProfile } from '../../interfaces/Profile';
import CASecondaryButton from '../../styles/components/secondaryButton';

interface ProfileSimpleCardProps {
  profile: IProfile;
  ref?: UseInfiniteScroll;
}

const ProfileSimpleCard: React.FC<ProfileSimpleCardProps> = ({
  ref,
  profile,
}) => (
  <div className="profile" ref={ref}>
    <Link href={`/profile/${profile.owner}`} key={profile.owner}>
      <a>
        <img
          src={process.env.NEXT_PUBLIC_API_HOST + profile.avatar}
          alt="Perfil"
        />
        <div className="profile-content">
          <div className="first-row">
            <strong>{profile.name}</strong>
            <div className="level">{profile.level}</div>
          </div>
          <div className="second-row">
            <p>@{profile.owner}</p>
            <p className="bio">{profile.bio}</p>
          </div>
        </div>
      </a>
    </Link>
    <CASecondaryButton className="main-color" type="button">
      SEGUIR
    </CASecondaryButton>
  </div>
);

export default ProfileSimpleCard;
