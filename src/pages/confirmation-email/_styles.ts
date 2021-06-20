import styled from 'styled-components';

const ConfirmationEmailContainer = styled.div`
  height: 100vh;
  min-height: 100vh;
  color: ${({ theme }) => theme.colors.themeColor};
  background-color: ${({ theme }) => theme.colors.alternativeBackground};

  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 2rem 0;
  }

  main {
    display: flex;
    align-items: center;
    flex-direction: column;

    p {
      font-size: 1.6rem;
      text-align: center;
      margin: 2rem 0;
      font-weight: bold;

      line-height: 3rem;
    }

    a {
      width: 20rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0;
      padding: 1rem 4rem;
      border-radius: 5px;
      font-weight: bold;
      font-size: 1.8rem;
      transition: filter 0.2s ease-in-out;

      &:hover {
        filter: brightness(0.6);
      }
    }
  }
`;

export default ConfirmationEmailContainer;
