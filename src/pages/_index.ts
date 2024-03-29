import styled from 'styled-components';

export const LandingModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 2rem;
  margin-top: 2rem;

  a {
    padding: 1rem 1rem;
    background: #50505b;
    border-radius: 4px;
    width: 48%;
    transition: filter 1s ease, color 1s ease;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font: 700 1.3rem ${({ theme }) => theme.fonts.primary};
    color: #fff;

    &:last-child {
      background: #393b73;
    }
  }

  a:hover {
    filter: brightness(0.7);
  }

  @media (min-width: 1100px) {
    padding-bottom: 0;
  }
`;

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
      font-weight: 500;
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
        display: block;
        margin: 0 auto;
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
          margin-top: 4rem;
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
