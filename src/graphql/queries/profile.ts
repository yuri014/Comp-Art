import { gql } from '@apollo/client';

export const GET_LOGGED_PROFILE = gql`
  query GetLoggedProfile {
    getLoggedProfile {
      name
      avatar
      coverImage
      followers
      following
      hashtags
      owner
      isArtist
    }
  }
`;

export const GET_PROFILE = gql`
  query GetProfile($username: String!) {
    getProfile(username: $username) {
      _id
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
