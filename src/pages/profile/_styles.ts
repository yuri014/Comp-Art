import styled from 'styled-components';

const ProfileContainer = styled.div`
  color: ${({ theme }) => theme.colors.themeColor};

  .cover-profile {
    width: 100%;
    height: 14rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.mainColor};

    &.cover-placeholder {
      background-color: ${({ theme }) => theme.colors.mainColor};
    }

    button {
      width: 100%;
      height: inherit;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .profile-links {
      font-size: 1.2rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.5rem;
      justify-content: flex-end;
      padding-right: 0.4rem;
      padding-bottom: 0.4rem;
      position: absolute;
      top: 7rem;
      right: 2rem;

      a {
        background: ${({ theme }) => theme.colors.secondaryBackgroundColor};
        width: 2.5rem;
        height: 2.5rem;
        padding: 0.4rem;
        border-radius: 50%;
        display: inline-grid;
        place-items: center;
      }

      div > * {
        margin-left: 1.6rem;
      }
    }
  }

  .buttons-profile {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 4rem;

    button {
      width: 12rem;
      border: none;
      color: #fff;
      padding: 1.1rem 1rem;
      border-radius: 5px;
      background-color: ${({ theme }) => theme.colors.mainColor};

      &.sponsorship {
        background-color: ${({ theme }) => theme.colors.purple};
      }

      &.edit-profile {
        background-color: #38383c;
      }
    }
  }

  main {
    section {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 3rem 3rem;
      background-color: ${({ theme }) => theme.colors.secondaryBackgroundColor};
      box-shadow: ${({ theme }) => theme.colors.mainShadow};

      .avatar-profile {
        position: relative;
        display: flex;
        justify-content: center;

        img {
          width: 11rem;
          border-radius: 50%;
          height: 11rem;
          box-shadow: 0 0 4px ${({ theme }) => theme.colors.namesakeText};
          cursor: pointer;
          border: 3px solid ${({ theme }) => theme.colors.pink};
          object-fit: cover;
        }

        p {
          position: absolute;
          font-size: 1.3rem;
          padding: 0.6rem 1.4rem;
          border-radius: 5px;
          bottom: 0;
          background-color: ${({ theme }) => theme.colors.pink};
        }
      }

      .profile {
        margin-top: 2rem;
        width: 100%;

        h1 {
          font-size: 2rem;
          width: 18.8rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        h2 {
          font-size: 1.4rem;
          color: ${({ theme }) => theme.colors.mainColor};
        }

        .profile-numbers {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 3rem;

          p {
            font-size: 1.4rem;
            color: ${({ theme }) => theme.colors.themeColor};
            text-align: center;
          }

          p:first-child {
            text-align: center;
            font-size: 2rem;
            font-weight: 600;
          }
        }
      }

      .bio,
      .joined {
        margin-top: 3rem;
        width: 100%;
        font-size: 1.4rem;
      }

      .bio {
        word-break: break-all;
      }

      .joined {
        text-align: center;
        text-transform: uppercase;
        color: #949494;
      }
    }
  }

  .profile-posts {
    margin-top: 2rem;
    padding-bottom: 8rem;
  }
`;

export default ProfileContainer;
