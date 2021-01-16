import { gql } from '@apollo/client';

const GET_PROFILE = gql`
  query GetProfile {
    getProfile {
      name
      avatar {
        url
      }
      coverImage {
        url
      }
      bio
      xp
      level
      followers
      following
    }
  }
`;

export default GET_PROFILE;
