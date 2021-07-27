import React from 'react';

import { IProfile } from '@interfaces/Profile';
import formatMetaHashtags from '@utils/formatHashtags';
import Meta from './Meta';

interface ProfileSEOProps {
  getProfile: IProfile;
}

const ProfileSEO: React.FC<ProfileSEOProps> = ({ getProfile }) => {
  const hashtags = formatMetaHashtags(getProfile.hashtags);

  const description = () => {
    if (hashtags.length > 0) {
      return getProfile.isArtist
        ? `artista que produz e/ou se interessa por ${hashtags}`
        : `fã de ${hashtags}`;
    }

    return getProfile.isArtist ? 'artista' : 'fã';
  };

  return (
    <Meta
      title={`${getProfile.owner} - Perfil`}
      description={`${getProfile.owner} é ${description()}`}
      keywords={`${getProfile.owner}, ${getProfile.name}, ${hashtags}, ${
        getProfile.bio
      }, ${getProfile.isArtist ? 'artista' : 'fã'}`}
      uri={`profile/${getProfile.owner}`}
      seoImage={getProfile.avatar}
    />
  );
};

export default ProfileSEO;
