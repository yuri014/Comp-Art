import styled from 'styled-components';

const RegisterContainer = styled.div`
  padding: 2rem 0;
  color: ${({ theme }) => theme.colors.themeColor};
  min-height: 100vh;
  display: grid;

  .modal-body {
    p {
      text-align: left;

      span {
        color: ${({ theme }) => theme.colors.mainColor};
      }

      & + p {
        margin-top: 1rem;
      }
    }
  }

  .verification-code {
    .input-group {
      margin-bottom: 4rem;
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
      }
    }

    button {
      display: block;
      margin: 0 auto;
      margin-bottom: 2rem;
    }
  }

  main {
    max-width: 80rem;
    margin: 0 auto;

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
        font-family: ${({ theme }) => theme.fonts.display};
        position: relative;
        width: 25rem;
        height: 10rem;
        border-radius: 10px;
        border: none;
        cursor: pointer;

        &.active,
        &:focus {
          border: 2px solid ${({ theme }) => theme.colors.mainColor};
          outline: none;
        }

        p {
          font-size: 1.4rem;
          color: ${({ theme }) => theme.colors.themeColor};
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
      padding: 3rem;
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

      button[type='submit'] {
        margin-top: 1rem;
      }

      .contract {
        p {
          font-size: 1.4rem;
          text-align: center;

          a {
            display: contents;
            font-weight: 400;
          }
        }
      }
    }
  }

  @media (min-width: 768px) {
    main {
      form {
        padding: 4rem;

        .subtitle,
        .contract p {
          width: 60%;
          margin: 0 auto;
        }

        .subtitle {
          margin: 2rem auto;
        }
      }

      .choose-profile {
        flex-direction: row;
        margin: 6rem 0;
        justify-content: space-between;

        button {
          margin-top: 0;

          &:last-child {
            margin-top: 0;

            img {
              left: 19rem;
            }
          }
        }
      }
    }
  }

  @media (min-width: 1100px) {
    main {
      form {
        .input-group {
          display: grid;
          grid-template-columns: 48% 48%;
          justify-content: space-between;
        }

        button[type='submit'] {
          width: 50%;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
      }
    }

    .verification-code {
      .input-group {
        div {
          gap: 2rem;
        }
      }

      button {
        width: 70%;
        margin-bottom: 0;
      }
    }
  }
`;

export default RegisterContainer;
