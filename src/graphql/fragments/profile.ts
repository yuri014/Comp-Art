/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const CORE_PROFILE_VIEW = gql`
  fragment CoreProfileView on Profile {
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
