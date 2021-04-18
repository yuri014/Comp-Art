import styled from 'styled-components';

const RegisterProfileContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  padding: 4rem 0;
  background-color: ${({ theme }) => theme.colors.alternativeBackground};
  color: ${({ theme }) => theme.colors.themeColor};

  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;

    .message {
      text-align: center;

      p {
        font-size: 2rem;
        margin-top: 1rem;
      }
    }

    footer {
      width: 100%;
      margin-top: 0;
    }
  }
`;

export default RegisterProfileContainer;
