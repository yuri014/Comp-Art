import { gql } from '@apollo/client';

export const CORE_PROFILE_VIEW = gql`
  fragment CoreProfileView on Profile {
    _id
    name
    avatar
    owner
  }
`;

export const LINKS_PROFILE = gql`
  fragment LinksProfile on Profile {
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
`;

export const MODAL_PROFILE = gql`
  fragment ModalProfile on Profile {
    _id
    name
    avatar
    bio
    owner
    followsYou
    isFollowing
  }
`;
