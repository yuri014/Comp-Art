import styled from 'styled-components';

const LoginContainer = styled.div`
  height: 100vh;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: ${({ theme }) => theme.colors.themeColor};

  main {
    h1 {
      margin-bottom: 2rem;
    }

    form {
      background-color: ${({ theme }) => theme.colors.secondaryBackgroundColor};
      border-radius: 10px;
      padding: 3rem;
      box-shadow: ${({ theme }) => theme.colors.mainShadow};

      h2 {
        text-align: center;
        margin-bottom: 2rem;
        font-size: 2rem;
      }

      p,
      a {
        margin-bottom: 1rem;
        font-size: 1.4rem;
        font-weight: bold;
      }

      a {
        margin-bottom: 2rem;
        display: block;
        color: ${({ theme }) => theme.colors.mainColor};
        font-size: 1.4rem;
        text-decoration: underline;
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
