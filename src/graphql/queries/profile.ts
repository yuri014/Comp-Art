import { gql } from '@apollo/client';

const GET_PROFILE = gql`
  query GetProfile {
    getProfile {
      name
      avatar
      coverImage
      bio
      xp
      level
      followers
      following
      hashtags
      owner
      links {
        soundcloud
        twitter
        facebook
        wattpad
        pinterest
        deviantart
        bandcamp
        customLink
      }
    }
  }
`;

export default GET_PROFILE;
