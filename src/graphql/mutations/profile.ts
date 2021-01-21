import { gql } from '@apollo/client';

export const REGISTER_PROFILE = gql`
  mutation CreateProfile($profile: CreateProfileInput!) {
    createProfile(createProfileInput: $profile)
  }
`;

export const FOLLOW_PROFILE = gql`
  mutation FollowProfile($username: String!) {
    follow(username: $username)
  }
`;
