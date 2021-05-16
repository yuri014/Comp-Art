import styled from 'styled-components';

const ProfileContainer = styled.div`
  color: ${({ theme }) => theme.colors.themeColor};

  .avatar-profile {
    width: 8rem;
    height: 8rem;
    z-index: 2;
    margin-top: -4rem;
    border-radius: 50%;
    cursor: pointer;

    img {
      box-shadow: 0 0 4px ${({ theme }) => theme.colors.namesakeText};
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .cover-profile {
    width: 100%;
    height: 12rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.mainColor};

    button {
      width: 100%;
      height: 12rem;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .profile-links {
      width: 100%;
      margin: 2rem 0;
      font-size: 2.2rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.5rem;
      justify-content: flex-end;

      div > * {
        margin-left: 1.6rem;
      }
    }
  }

  .buttons-profile {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 0.8rem;
    margin-top: -3rem;
    margin-bottom: 1rem;

    button {
      width: 10rem;
    }
  }

  main {
    background-color: ${({ theme }) => theme.colors.secondaryBackgroundColor};
    box-shadow: ${({ theme }) => theme.colors.mainShadow};

    section {
      display: flex;
      flex-direction: column;
      align-items: center;

      .profile {
        margin-top: 1rem;
        width: 100%;
        display: grid;
        grid-template-areas:
          '. .'
          'follow follow';
        grid-template-rows: auto auto;

        h1 {
          font-size: 2rem;
          width: 18.8rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        h2 {
          font-size: 1.4rem;
          color: ${({ theme }) => theme.colors.lightText};
        }

        p {
          font-size: 1.4rem;
          color: ${({ theme }) => theme.colors.lightText};
          text-align: right;
        }

        p:first-child {
          text-align: right;
          font-size: 2rem;
          font-weight: 600;
          color: ${({ theme }) => theme.colors.themeColor};
          .level {
            background-color: ${({ theme }) => theme.colors.mainColor};
            color: ${({ theme }) => theme.colors.backgroundColor};
            padding: 0 0.8rem;
            border-radius: 4px;
          }
        }

        .profile-follows {
          grid-area: follow;
          margin-top: 2rem;
          display: flex;
          justify-content: flex-start;
          gap: 1rem;

          p {
            font-size: 1.8rem;
            color: ${({ theme }) => theme.colors.themeColor};

            span {
              font-weight: bold;
            }
          }

          p:first-child {
            margin-bottom: 0.4rem;
            font-size: 1.8rem;
          }
        }
      }

      .bio {
        margin-top: 2rem;
        width: 100%;
        font-size: 1.4rem;
        border-radius: 4px;
        padding: 1rem;
        word-break: break-all;
      }
    }
  }

  .profile-posts {
    padding-bottom: 8rem;
  }
`;

export default ProfileContainer;
