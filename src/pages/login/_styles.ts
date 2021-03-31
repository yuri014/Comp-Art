import styled from 'styled-components';

const LoginContainer = styled.div`
  height: 100vh;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: ${props => props.theme.colors.themeColor};

  main {
    h1 {
      margin-bottom: 2rem;
    }

    form {
      background-color: ${props => props.theme.colors.secondaryBackgroundColor};
      border-radius: 10px;
      padding: 3rem;

      h2 {
        text-align: center;
        margin-bottom: 2rem;
        font-size: 1.8rem;
      }

      p,
      a {
        margin-bottom: 1rem;
        font-size: 1.4rem;
        font-weight: bold;
      }

      label {
        display: flex;
        flex-direction: column;

        input {
          padding: 1.4rem 2rem;
          background-color: ${props => props.theme.colors.backgroundColor};
          border: none;
          border-radius: 5px;
          margin-bottom: 2rem;

          &:focus {
            outline: 1px solid #949494;
          }
        }
      }

      a {
        margin-bottom: 2rem;
        display: block;
        color: ${props => props.theme.colors.mainColor};
        font-size: 1.4rem;
        text-decoration: underline;
      }

      .login-button {
        width: 100%;
        padding: 1.4rem;
        border-radius: 5px;
        border: none;
        background-color: ${props => props.theme.colors.mainColor};
        color: ${props => props.theme.colors.themeColor};
        margin-bottom: 2rem;
        cursor: pointer;
        transition: 0.2s ease-in-out;

        &:hover {
          border-radius: 10px;
        }
      }

      .register {
        text-align: center;

        a {
          display: unset;
        }
      }
    }
  }

  footer {
    margin-top: 4rem;
  }

  @media (min-width: 768px) {
    main {
      form {
        max-width: 40rem;
        margin: 0 auto;
      }
    }
  }

  @media (min-width: 1440px) {
    main {
      h1 {
        margin-bottom: 4rem;
      }

      form {
        padding: 4rem;
      }

      .register {
        margin-top: 2rem;
      }
    }
  }
`;

export default LoginContainer;
