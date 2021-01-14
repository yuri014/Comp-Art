import { gql } from '@apollo/client';

const REGISTER_ARTIST_PROFILE = gql`
  mutation CreateProfile($profile: CreateProfileInput!) {
    createProfile(createProfileInput: $profile)
  }
`;

export default REGISTER_ARTIST_PROFILE;
