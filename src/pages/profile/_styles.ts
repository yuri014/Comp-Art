import styled from 'styled-components';

const ProfileContainer = styled.div`
  color: ${({ theme }) => theme.colors.themeColor};

  .cover-profile {
    width: 100%;
    height: 14rem;
    position: absolute;
    top: 0;

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
      font-size: 1.3rem;
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

  main {
    margin-top: 14rem;

    .profile-posts {
      margin-top: 2rem;
      padding-bottom: 8rem;
    }

    .no-logged {
      display: none;
    }
  }

  @media (min-width: 1100px) {
    main {
      max-width: 1378px;
      padding: 0 4rem;
      padding-bottom: 4rem;
      display: grid;
      grid-template-columns: 24% 48% 24%;
      justify-content: space-between;
      margin: auto;
      margin-top: 36rem;

      .profile-posts {
        margin-top: -48px;
        padding-bottom: 4rem;
      }

      aside {
        div {
          width: unset;
        }
      }

      .no-logged {
        display: block;
        background: ${({ theme }) => theme.colors.secondaryBackgroundColor};
        height: fit-content;
        border-radius: 5px;
        padding: 2rem 1rem;
        text-align: center;
        box-shadow: ${({ theme }) => theme.colors.mainShadow};

        h4 {
          font-size: 1.8rem;
        }

        p {
          font-size: 1.4rem;
        }

        h4,
        p {
          margin-bottom: 2rem;
        }

        a {
          display: block;
          width: 12rem;
          margin: 0 auto;
          font-size: 1.3rem;
        }
      }
    }

    .cover-profile {
      height: 24rem;
      top: 6rem;

      .profile-links {
        top: 19rem;
        flex-direction: row;
        gap: 0;
        right: 3rem;

        a {
          font-size: 2rem;
          width: 4rem;
          height: 4rem;
          padding: 1rem;
          display: inline-flex;
          border-radius: 50%;
          transform: scale(0.8);
        }

        div > * {
          margin-left: 0.6rem;
        }
      }
    }
  }
`;

export default ProfileContainer;
