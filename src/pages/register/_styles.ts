import styled from 'styled-components';

const RegisterContainer = styled.div`
  padding: 2rem 0;
  color: ${props => props.theme.colors.themeColor};

  main {
    h1 {
      margin-top: 2rem;
    }

    .choose-profile {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 2rem;

      button {
        box-shadow: ${({ theme }) => theme.colors.mainShadow};
        display: grid;
        place-items: center;
        margin-top: 2rem;
        background: ${({ theme }) => theme.colors.secondaryBackgroundColor};
        position: relative;
        width: 25rem;
        height: 10rem;
        border-radius: 10px;
        border: none;

        &.active,
        &:focus {
          border: 2px solid ${props => props.theme.colors.mainColor};
          outline: none;
        }

        p {
          font-size: 1.4rem;
          font-weight: bold;
          color: ${props => props.theme.colors.themeColor};
        }

        img {
          position: absolute;
          transform: scale(0.6);
          top: -6rem;
          left: -5rem;
        }

        &:last-child {
          margin-top: 4rem;
        }
      }
    }

    form {
      background: ${({ theme }) => theme.colors.secondaryBackgroundColor};
      margin-top: 4rem;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: ${({ theme }) => theme.colors.mainShadow};

      a {
        font-size: 1.4rem;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        color: ${({ theme }) => theme.colors.mainColor};
        font-weight: bold;
      }

      h2 {
        font-size: 2rem;
        text-align: center;
        margin-top: 2rem;
      }

      .subtitle {
        font-size: 1.4rem;
        text-align: center;
        margin: 2rem 0;
      }
    }
  }
`;

export default RegisterContainer;
