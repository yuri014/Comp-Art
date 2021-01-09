import { gql } from '@apollo/client';

const REGISTER_USER = gql`
  mutation RegisterUser($registerInput: RegisterInput) {
    register(registerInput: $registerInput) {
      username
      email
      token
    }
  }
`;

export default REGISTER_USER;
