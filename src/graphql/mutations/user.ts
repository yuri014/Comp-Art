import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($registerInput: RegisterInput!) {
    register(registerInput: $registerInput)
  }
`;

export const CONFIRMATION_EMAIL = gql`
  mutation ConfirmationEmail($code: String!, $email: String!) {
    confirmationEmail(code: $code, email: $email) {
      id
      username
      isArtist
      token
    }
  }
`;

export const RESEND_CONFIRMATION_CODE = gql`
  mutation ResendConfirmationCode($email: String!) {
    resendConfirmationCode(email: $email)
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
