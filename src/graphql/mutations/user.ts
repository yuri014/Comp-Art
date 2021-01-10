import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($registerInput: RegisterInput) {
    register(registerInput: $registerInput) {
      username
      email
      token
    }
  }
`;

export const CONFIRMATION_EMAIL = gql`
  mutation ConfirmationEmail($token: String!) {
    confirmationEmail(token: $token) {
      id
      username
      email
    }
  }
`;
