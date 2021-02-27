import styled from 'styled-components';

const SingUpContainer = styled.div`
  .login-form {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-form-content {
    position: relative;
    width: 80%;
    margin-top: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 2rem 4rem;
    background: ${props => props.theme.colors.mainGradient};
    border-radius: 4px;
  }

  .login-icon {
    display: none;
  }

  .login-button {
    width: 10rem;
    height: 4rem;
    margin: auto;
    margin-top: 0.8rem;
    border: 1px solid ${props => props.theme.colors.mainColor};
    background-color: transparent;
    font: 700 12px ${props => props.theme.fonts.display}, sans-serif;
    border-radius: 4px;
    color: ${props => props.theme.colors.mainColor};
    letter-spacing: 3px;
    transition: background-color 0.8s ease-in-out;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-button a {
    color: ${props => props.theme.colors.namesakeText};
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  @media (min-width: 992px) {
    .login-form {
      width: unset;
    }

    .login-content {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 100vh;
    }

    .login-form-content {
      width: 70rem;
      background: transparent;
      position: relative;
      margin: 20rem 0;
      & label,
      input {
        color: ${props => props.theme.colors.namesakeText};
      }
    }

    .login-icon {
      position: absolute;
      display: initial;
      top: 0;
    }

    .login-icon svg {
      display: flex;
      width: 100%;
      margin: auto;
    }

    #login-title {
      font-size: 8rem;
      width: 26rem;
    }

    .login-form-content input::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: ${props => props.theme.colors.namesakeText};
      opacity: 1; /* Firefox */
    }

    .login-form-content input:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: ${props => props.theme.colors.namesakeText};
    }

    .login-form-content input::-ms-input-placeholder {
      /* Microsoft Edge */
      color: ${props => props.theme.colors.namesakeText};
    }

    .login-form-content {
      padding: 0 12rem;
      background-color: unset;
    }

    .login-icon svg {
      width: 100%;
      display: flex;
      margin: auto;
    }

    .login-button {
      margin-top: 4rem;
      border: 1px solid ${props => props.theme.colors.namesakeText};
      color: ${props => props.theme.colors.namesakeText};
      display: flex;
      align-items: center;
      justify-content: center;
      width: 12rem;
    }

    .login-button:hover {
      background-color: ${props => props.theme.colors.mainColor};
    }
  }
`;

export default SingUpContainer;
