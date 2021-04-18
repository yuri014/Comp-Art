import React from 'react';

interface ProfileImagePreviewProps {
  preview?: string;
  alt: string;
  olderImage: string;
}

const ProfileImagePreview: React.FC<ProfileImagePreviewProps> = ({
  alt,
  olderImage,
  preview,
  children,
}) => (
  <>
    {preview ? (
      <img src={preview} alt={alt} />
    ) : (
      <>{olderImage ? <img src={olderImage} alt={alt} /> : children}</>
    )}
  </>
);

export default ProfileImagePreview;
