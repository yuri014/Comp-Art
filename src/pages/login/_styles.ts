import styled from 'styled-components';

const LoginContainer = styled.div`
  height: 100vh;
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: ${props => props.theme.colors.themeColor};

  main {
    h1 {
      text-align: center;
      font-family: ${props => props.theme.fonts.display};
      font-size: 5rem;
      letter-spacing: 0.2rem;
      text-shadow: 6px 6px 0px rgba(0, 0, 0, 0.2);
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

      button {
        width: 100%;
        padding: 1.4rem;
        border-radius: 5px;
        border: none;
        background-color: ${props => props.theme.colors.mainColor};
        color: ${props => props.theme.colors.themeColor};
        margin-bottom: 2rem;
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
`;

export default LoginContainer;
