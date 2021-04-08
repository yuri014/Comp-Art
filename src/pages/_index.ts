import styled from 'styled-components';

const LandingContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  .container {
    height: 100vh;
    padding: 4rem 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  main {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    color: ${({ theme }) => theme.colors.themeColor};

    h2 {
      font-size: 2rem;
      text-align: center;
    }

    section {
      img {
        width: 100%;
        height: 90%;
        margin: -3rem 0;
      }

      p {
        font-size: 1.6rem;
        text-align: center;
        margin: 2rem 0;
      }

      button {
        width: 20rem;
      }
    }
  }

  @media (min-width: 768px) {
    .container {
      padding: 8rem 0;
    }

    main {
      h2,
      p {
        padding: 0 6rem;
      }

      section {
        p {
          margin-top: 4rem;
        }
      }
    }
  }

  @media (min-width: 1100px) {
    main {
      height: 80%;

      h2 {
        font-size: 2.6rem;
      }

      section {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        justify-content: space-between;

        p {
          padding: 0;
          width: 40rem;
          text-align: left;
          font-size: 1.8rem;
        }

        button {
          margin: unset;
          margin-top: 8rem;
        }

        img {
          margin: unset;
        }
      }
    }
  }

  @media (min-width: 1200px) {
    main {
      h2 {
        width: 60rem;
      }

      section {
        width: 100%;
        img {
          width: 47rem;
        }
      }
    }
  }
`;

export default LandingContainer;
