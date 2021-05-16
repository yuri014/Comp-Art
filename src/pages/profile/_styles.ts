import styled from 'styled-components';

const ProfileContainer = styled.div`
  color: ${({ theme }) => theme.colors.themeColor};

  .cover-profile {
    width: 100%;
    height: 14rem;

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

  .profile-posts {
    margin-top: 2rem;
    padding-bottom: 8rem;
  }

  @media (min-width: 1100px) {
    .cover-profile {
      padding-top: 6rem;
      height: 25rem;

      .profile-links {
        top: 25rem;
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

    main {
      max-width: 1378px;
      padding: 11rem 4rem;
      padding-bottom: 4rem;
      display: grid;
      grid-template-columns: 24% 48% 24%;
      justify-content: space-between;
      margin: auto;

      .profile-posts {
        margin-top: 0;
        padding-bottom: 4rem;
      }
    }
  }
`;

export default ProfileContainer;
