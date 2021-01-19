import { gql } from '@apollo/client';

const GET_PROFILE = gql`
  query GetProfil($username: String!) {
    getProfile(username: $username) {
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
