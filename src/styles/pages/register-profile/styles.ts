import styled from 'styled-components';

const RegisterProfileContainer = styled.main`
  color: ${props => props.theme.colors.lightContrast};
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  height: 180vh;
  #register-profile-title {
    text-align: center;
    font-size: 20px;
    word-wrap: break-word;
    margin: 0;
  }

  & .inputs {
    padding: 2rem;
  }

  & form {
    width: 85%;
    background: ${props => props.theme.colors.mainGradient};
    border-radius: 4px;
    & .profile-image-upload,
    .profile-image-cover {
      & input {
        display: none;
      }
    }

    & .profile-image-cover {
      border-radius: 4px 4px 0 0;
      height: 12rem;
      width: 100%;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: flex-start;
      & img {
        width: 100%;
        height: 100%;
        border-radius: 4px 4px 0 0;
        object-fit: cover;
      }
      & .holder {
        background-color: ${props => props.theme.colors.lightContrast};
        border-radius: 4px 4px 0 0;
        width: 100%;
        height: 100%;
      }
      & label {
        margin-top: -12rem;
        & .upload-icon {
          color: ${props => props.theme.colors.mainColor};
        }
      }
    }

    & .profile-image-upload {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      margin-top: -6rem;
      display: flex;
      align-items: baseline;
      border-radius: 50%;
      & a {
        width: 100%;
        height: 100%;
      }
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
      }
    }
  }

  .link-label {
    color: ${props => props.theme.colors.lightContrast};
    margin-left: 1rem;
    margin-right: -0.9rem;
    margin-bottom: 0.2rem;
  }

  .link-label-end {
    color: ${props => props.theme.colors.lightContrast};
    margin-bottom: 0.2rem;
  }

  @media (min-width: 1100px) {
    display: grid;
    grid-template-columns: 20% 50%;
    justify-content: space-around;
    height: 120vh;
    & h1 {
      font-size: 54px;
    }
    .link-label {
      margin-bottom: 0.1rem;
    }
    & form {
      width: 100%;
      & .profile-links {
        display: grid;
        grid-template-columns: 48% 48%;
        justify-content: space-between;
      }
    }
  }
`;

export default RegisterProfileContainer;
