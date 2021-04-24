import { gql } from '@apollo/client';
import { CORE_PROFILE_VIEW } from '../fragments/profile';

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
  query GetProfile($username: String!) {
    getProfile(username: $username) {
      ...CoreProfileView
      _id
      coverImage
      bio
      xp
      level
      followers
      following
      hashtags
      isArtist
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
      postCount
      sharedPostCount
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
