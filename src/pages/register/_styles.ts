import styled from 'styled-components';

const RegisterContainer = styled.div`
  padding: 2rem 0;
  color: ${({ theme }) => theme.colors.themeColor};
  min-height: 100vh;
  display: grid;

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

      button {
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

      form {
        padding: 4rem;
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

        button {
          width: 50%;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
      }
    }
  }
`;

export default RegisterContainer;
