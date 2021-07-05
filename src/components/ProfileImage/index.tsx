import React from 'react';
import AvatarPlaceholder from './styles';

interface ProfileImageProps {
  alt: string;
  avatar: string;
  username: string;
  className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  alt,
  avatar,
  className,
  username,
}) => (
  <AvatarPlaceholder className={className}>
    {avatar ? (
      <img src={process.env.NEXT_PUBLIC_API_HOST + avatar} alt={alt} />
    ) : (
      <div className="holder">
        <p>
          {username[0]}
          {username[1]}
        </p>
      </div>
    )}
  </AvatarPlaceholder>
);

ProfileImage.defaultProps = {
  className: '',
};

export default ProfileImage;
