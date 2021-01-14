import { gql } from '@apollo/client';

const REGISTER_ARTIST_PROFILE = gql`
  mutation CreateArtistProfile($artistProfile: CreateProfileInput!) {
    createArtistProfile(createProfileInput: $artistProfile)
  }
`;

export default REGISTER_ARTIST_PROFILE;
