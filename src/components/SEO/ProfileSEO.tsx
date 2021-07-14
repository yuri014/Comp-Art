import React from 'react';

import { IProfile } from '@interfaces/Profile';
import formatMetaHashtags from '@utils/formatHashtags';
import Meta from './Meta';

interface ProfileSEOProps {
  getProfile: IProfile;
}

const ProfileSEO: React.FC<ProfileSEOProps> = ({ getProfile }) => {
  const hashtags = formatMetaHashtags(getProfile.hashtags);

  return (
    <Meta
      title={`${getProfile.owner} - Perfil`}
      description={`${getProfile.owner} é ${
        getProfile.isArtist
          ? `artista que produz e/ou se interessa por ${hashtags}`
          : `fã de ${hashtags}`
      }`}
      keywords={`${getProfile.owner}, ${getProfile.name}, ${hashtags}, ${
        getProfile.bio
      }, ${getProfile.isArtist ? 'artista' : 'fã'}`}
      uri={`profile/${getProfile.owner}`}
      seoImage={getProfile.avatar}
    />
  );
};

export default ProfileSEO;
