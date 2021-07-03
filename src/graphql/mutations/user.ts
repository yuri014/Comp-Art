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

export const SEND_FORGOT_PASSWORD_EMAIL = gql`
  mutation SendForgotPasswordEmail($email: String!) {
    sendForgotPasswordEmail(email: $email)
  }
`;

export const RECOVER_PASSWORD = gql`
  mutation RecoverPassword(
    $token: String!
    $newPassword: String!
    $confirmPassword: String!
  ) {
    recoverPassword(
      token: $token
      newPassword: $newPassword
      confirmPassword: $confirmPassword
    ) {
      id
      username
      isArtist
      token
    }
  }
`;
