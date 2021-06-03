import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($registerInput: RegisterInput!) {
    register(registerInput: $registerInput)
  }
`;

export const CONFIRMATION_EMAIL = gql`
  mutation ConfirmationEmail($token: String!) {
    confirmationEmail(token: $token) {
      id
      username
      isArtist
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
      isArtist
      token
    }
  }
`;
