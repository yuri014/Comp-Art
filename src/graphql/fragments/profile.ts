/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const CORE_PROFILE_VIEW = gql`
  fragment CoreProfileView on Profile {
    name
    avatar
    owner
  }
`;
