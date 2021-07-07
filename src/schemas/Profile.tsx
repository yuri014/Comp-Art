import React from 'react';
import { Person } from 'schema-dts';
import { JsonLd } from 'react-schemaorg';
import { IProfile } from '@interfaces/Profile';

interface ProfileSchemaProps {
  profile: IProfile;
}

const ProfileSchema: React.FC<ProfileSchemaProps> = ({ profile }) => (
  <JsonLd<Person>
    item={{
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile.name,
      alternateName: profile.owner,
      knowsAbout: profile.hashtags,
      description: profile.bio,
      image: profile.avatar,
      sameAs: [
        `https://www.facebook.com/${profile.links.facebook}`,
        `https://twitter.com/${profile.links.twitter}`,
        `https://pinterest.com/${profile.links.pinterest}`,
        `https://soundcloud.com/${profile.links.soundcloud}`,
        `https://deviantart.com/${profile.links.deviantart}`,
        `https://wattpad.com/user/${profile.links.wattpad}`,
        `https://${profile.links.bandcamp}.bandcamp.com/`,
      ],
    }}
  />
);

export default ProfileSchema;
