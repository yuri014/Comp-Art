import { gql } from '@apollo/client';

export const GET_LOGGED_PROFILE = gql`
  query GetLoggedProfile {
    getLoggedProfile {
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
    }
  }
`;

export const GET_PROFILE = gql`
  query GetProfile($username: String!) {
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
  query GetIsFollowing($username: String!) {
    getIsFollowing(username: $username)
  }
`;
