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
    }
  }
`;

export default GET_PROFILE;
