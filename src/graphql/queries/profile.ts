import { gql } from '@apollo/client';
import { CORE_PROFILE_VIEW, LINKS_PROFILE } from '../fragments/profile';

export const GET_LOGGED_PROFILE = gql`
  ${CORE_PROFILE_VIEW}
  query GetLoggedProfile {
    getLoggedProfile {
      ...CoreProfileView
      coverImage
      followers
      following
      hashtags
      isArtist
    }
  }
`;

export const GET_PROFILE = gql`
  ${CORE_PROFILE_VIEW}
  ${LINKS_PROFILE}
  query GetProfile($username: String!) {
    getProfile(username: $username) {
      ...CoreProfileView
      ...LinksProfile
      coverImage
      bio
      xp
      level
      followers
      following
      hashtags
      isArtist
      postCount
      sharedPostCount
      createdAt
    }
  }
`;

export const GET_IS_FOLLOWING = gql`
  query GetIsFollowing($id: String!) {
    getIsFollowing(id: $id)
  }
`;

export const GET_LEVEL_XP = gql`
  query GetLevelProfile {
    getLoggedProfile {
      level
      xp
    }
  }
`;

export const GET_FULL_LOGGED_PROFILE = gql`
  ${CORE_PROFILE_VIEW}
  ${LINKS_PROFILE}
  query GetLoggedProfile {
    getLoggedProfile {
      ...CoreProfileView
      ...LinksProfile
      coverImage
      bio
      followers
      following
      hashtags
      isArtist
    }
  }
`;
