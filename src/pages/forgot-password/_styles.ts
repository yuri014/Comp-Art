import styled from 'styled-components';

const ForgotPasswordContainer = styled.div`
  height: 100vh;
  padding: 4rem 0;
  padding-bottom: 2rem;
  display: grid;
  color: ${({ theme }) => theme.colors.themeColor};

  header {
    margin-top: -3rem;
  }

  main {
    form {
      background-color: ${({ theme }) => theme.colors.secondaryBackgroundColor};
      border-radius: 10px;
      padding: 3rem;
      box-shadow: ${({ theme }) => theme.colors.mainShadow};

      h2 {
        text-align: center;
        margin-bottom: 2rem;
        font-size: 2rem;
        font-weight: 600;
      }

      p {
        margin-bottom: 1rem;
        font-size: 1.4rem;
      }
    }
  }

  footer {
    margin-top: 0;
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
    padding: 10rem 0;
    padding-top: 8rem;

    main {
      form {
        padding: 4rem;
      }
    }
  }
`;

export default ForgotPasswordContainer;
