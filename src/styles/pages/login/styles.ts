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

  @media (min-width: 1100px) {
    .login-content {
      display: grid;
      grid-template-columns: 1fr 2fr;
    }

    .login-form-content {
      background: transparent;
      & label,
      input {
        color: ${props => props.theme.colors.namesakeText};
      }
    }

    .login-icon {
      position: absolute;
      display: initial;
    }

    .login-icon svg {
      display: flex;
      width: 100%;
      margin: auto;
      margin-top: 65%;
    }

    #login-title {
      font-size: 8rem;
      margin-left: 25%;
      margin-top: auto;
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

    .login-form {
      margin-top: -25%;
    }

    .login-form-content {
      margin-top: 45%;
      padding: 0 12rem;
      background-color: unset;
    }

    .login-icon svg {
      width: 100%;
      display: flex;
      margin: auto;
      margin-top: 65%;
    }

    .login-button {
      margin-top: 8rem;
      border: 1px solid ${props => props.theme.colors.namesakeText};
      color: ${props => props.theme.colors.namesakeText};
      display: flex;
      align-items: center;
      justify-content: center;
      width: 12rem;
    }

    .login-icon img {
      height: 90vh;
    }

    .login-button:hover {
      background-color: ${props => props.theme.colors.mainColor};
    }
  }
`;

export default SingUpContainer;
