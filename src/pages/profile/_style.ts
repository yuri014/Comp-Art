import styled from 'styled-components';

export const ProfileContainer = styled.div`
  color: ${({ theme }) => theme.colors.themeColor};

  .cover-profile {
    width: 100%;
    height: 12rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.mainColor};
    z-index: 1;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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

  .edit-profile {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: -3rem;
    margin-bottom: 1rem;
  }

  main {
    section {
      display: flex;
      flex-direction: column;
      align-items: center;

      .profile {
        margin-top: 1rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        h1 {
          font-size: 2rem;
        }

        h2 {
          font-size: 1.4rem;
          color: ${({ theme }) => theme.colors.lightText};
        }

        p {
          font-size: 1.4rem;
          color: ${({ theme }) => theme.colors.lightText};
        }

        p:first-child {
          text-align: right;
          font-size: 2rem;
          font-weight: 600;
          color: ${({ theme }) => theme.colors.lightContrast};
          .level {
            background-color: ${({ theme }) => theme.colors.mainColor};
            color: ${({ theme }) => theme.colors.backgroundColor};
            padding: 0 0.8rem;
            border-radius: 4px;
          }
        }
      }

      .bio {
        margin-top: 2rem;
        width: 100%;
        font-size: 1.4rem;
        border: 1px solid ${({ theme }) => theme.colors.namesakeText};
        border-radius: 4px;
        padding: 1rem;
      }

      .profile-follows {
        display: none;
      }

      .mobile-profile-follows {
        width: 100%;
        margin-top: 2rem;
        font-size: 1.6rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
      }

      .profile-links {
        width: 100%;
        margin: 2rem 0;
        font-size: 2.2rem;
        display: grid;
        grid-column-gap: 1.4rem;
        grid-template-columns: 2.2rem 2.2rem 2.2rem 2.2rem;
        align-content: flex-end;
        justify-content: flex-end;
      }
    }
  }

  .profile-posts {
    padding-top: 4rem;
    padding-bottom: 8rem;
    border-top: 1px solid ${({ theme }) => theme.colors.namesakeText};
  }
`;

export const EditProfileContainer = styled.main`
  display: grid;
  place-items: center;
  margin-top: 2rem;
  padding-bottom: 8rem;

  @media (min-width: 1100px) {
    padding-top: 8rem;
    padding-bottom: 2rem;
    margin: 0 auto;
    width: 50%;
  }
`;
