import styled from 'styled-components';

const NotLoggedInviteContainer = styled.div`
  width: 100vw;
  height: 25vh;
  position: fixed;
  bottom: 0;
  z-index: 9;
  background: #444444;
  padding: 2rem;
  color: white;

  .container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;
  }

  .texts {
    p {
      font-size: 1.8rem;

      & + p {
        font-size: 1.4rem;
      }
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
      background: #18817a;
      padding: 1rem 2rem;
      color: white;
      border-radius: 5px;
      font-size: 1.3rem;
      width: 12rem;
      text-align: center;
      border: 1px solid #18817a;

      & + a {
        background: transparent;
        border: 1px solid white;
      }
    }
  }

  @media (min-width: 768px) {
    height: 10vh;

    .container {
      flex-direction: row;
      align-items: center;
      max-width: 100rem;
    }

    .buttons {
      a {
        & + a {
          margin-left: 3rem;
        }
      }
    }
  }

  @media (min-width: 1100px) {
    height: 15vh;

    .texts {
      p {
        font-size: 2rem;

        & + p {
          font-size: 1.6rem;
        }
      }
    }
  }
`;

export default NotLoggedInviteContainer;
