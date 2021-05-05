import styled from 'styled-components';

const ProfileContainer = styled.div`
  color: ${({ theme }) => theme.colors.themeColor};

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
  }
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
      }

      .profile-follows {
        grid-area: follow;
        margin-top: 2rem;
        display: flex;
        justify-content: flex-start;
        gap: 1rem;

        p:first-child {
          margin-bottom: 0.4rem;
          font-size: 1.8rem;
        }

        p {
          font-size: 1.8rem;
          color: ${({ theme }) => theme.colors.themeColor};

          span {
            font-weight: bold;
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
  }

  .profile-posts {
    padding-bottom: 8rem;
  }

  @media (min-width: 1100px) {
    .buttons-profile {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-top: -6rem;
      margin-bottom: 4rem;
      button {
        padding: 0.8rem 0;
        font-size: 1.6rem;
        width: 14rem;
      }
    }

    .cover-profile {
      height: 18rem;

      button {
        height: 18rem;
      }
    }

    .avatar-profile {
      width: 12rem;
      height: 12rem;
      margin: 0;
      margin-top: -4rem;
    }

    main {
      padding-top: 6rem;

      section {
        display: grid;
        margin-top: -10.4rem;
        grid-template-areas:
          'profile profile .'
          'bio bio links';
        align-items: baseline;

        .profile {
          margin-left: 16rem;
          display: flex;
          align-items: baseline;
          justify-content: flex-start;
          grid-area: profile;

          h1 {
            font-size: 2.4rem;
          }

          h2 {
            font-size: 1.6rem;
            color: ${({ theme }) => theme.colors.lightText};
            margin-top: 0.4rem;
          }

          p:first-child {
            font-size: 2.4rem;
            margin-top: 0;
            text-align: left;
          }

          p {
            font-size: 1.6rem;
            margin-left: 6rem;
            margin-top: 0.4rem;
            font-weight: 700;
          }
        }

        .profile-follows {
          margin-top: 2rem;
          display: block;
          font-size: 1.8rem;
          p:first-child {
            margin-bottom: 0.4rem;
            font-size: 1.8rem;
            color: ${({ theme }) => theme.colors.lightText};
          }

          p {
            font-size: 1.8rem;
            color: ${({ theme }) => theme.colors.lightText};
            font-weight: 600;

            span {
              color: ${({ theme }) => theme.colors.themeColor};
            }
          }
        }

        .bio {
          font-size: 1.6rem;
          width: 80%;
          grid-area: bio;
          height: 6.8rem;
        }

        .profile-links {
          font-size: 2.8rem;
          grid-area: links;
          margin: 3rem 0;
          width: 18rem;
          justify-content: space-between;
          justify-self: flex-end;
        }
      }
    }

    .profile-posts {
      width: 100%;
      padding: 2rem 25%;
    }
  }
`;

export default ProfileContainer;