import styled from 'styled-components';

const RegisterProfileContainer = styled.main`
  color: ${props => props.theme.colors.lightContrast};
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  min-height: 100vh;
  #register-profile-title {
    text-align: center;
    font-size: 20px;
    word-wrap: break-word;
    margin: 0;
  }
  & form {
    width: 85%;
    padding: 2rem;
    background: ${props => props.theme.colors.mainGradient};
    border-radius: 4px;
    & .profile-image-upload {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      display: flex;
      align-items: baseline;
      border-radius: 50%;
      & img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      & label {
        margin-left: -4rem;
        margin-bottom: 1rem;
        border-radius: 50%;
        background: ${props => props.theme.colors.mainColor};
        & .upload-icon {
          color: #fff;
        }
        & input {
          display: none;
        }
      }
    }
  }
`;

export default RegisterProfileContainer;
