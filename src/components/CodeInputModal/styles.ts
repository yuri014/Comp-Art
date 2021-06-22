import styled from 'styled-components';

export const CodeInputHeaderContainer = styled.div`
  p {
    text-align: left;

    span {
      color: ${({ theme }) => theme.colors.mainColor};
    }

    & + p {
      margin-top: 1rem;
    }
  }
`;

export const CodeInputModalContainer = styled.form`
  box-shadow: none;
  justify-content: center;
  padding: 0;
  margin-top: 0;

  .input-group {
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100% !important; /* Sobrescrever inline css da lib */

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }

    input {
      width: 6rem;
      height: 6rem;
      background-color: ${({ theme }) => theme.colors.inputBackground};
      border: none;
      border-radius: 5px;
      font-size: 3rem;
      text-align: center;
      color: ${({ theme }) => theme.colors.themeColor};

      &:focus {
        border: 2px solid ${({ theme }) => theme.colors.danger};
        outline: none;
      }

      &:last-child {
        border-right: none;
      }
    }
  }

  button {
    display: block;
    margin: 0 auto;
    width: 90%;
    margin-bottom: 2rem;
  }

  .buttons {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: space-between;

    .resend-code-container {
      font-size: 1.3rem;
      margin-bottom: 2rem;

      .resend-code {
        p {
          display: inline;
        }

        button {
          display: contents;
          color: ${({ theme }) => theme.colors.mainColor};
        }
      }
    }
  }

  @media (min-width: 1100px) {
    .input-group {
      div {
        gap: 2rem;
      }
    }

    .buttons {
      flex-direction: row;
      align-items: center;

      .resend-code-container {
        margin-bottom: 0;
      }

      button {
        margin: 0;
        width: 50%;
      }
    }
  }
`;
