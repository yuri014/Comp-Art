import styled from 'styled-components';

export const ProfileContainer = styled.div`
  color: ${({ theme }) => theme.colors.lightContrast};
  width: 100%;

  & .cover-profile {
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
  & .avatar-profile {
    width: 84px;
    height: 84px;
    z-index: 2;
    margin-left: 2rem;
    margin-top: -4rem;
    border-radius: 50%;
    cursor: pointer;

    & img {
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
    padding: 0 3rem;
    margin-top: -3rem;
    margin-bottom: 1rem;
    & button {
      border: 1px solid ${({ theme }) => theme.colors.mainColor};
      color: ${({ theme }) => theme.colors.lightContrast};
      border-radius: 4px;
      padding: 0.4rem 1rem;
      background: none;
      transition: 0.4s ease;
      cursor: pointer;
      font-size: 1.4rem;
      font-family: ${({ theme }) => theme.fonts.display};
      &:hover {
        box-shadow: 0 0 4px 2px ${({ theme }) => theme.colors.lightText};
      }
    }
  }

  main {
    & section {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem 3rem;

      .profile {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        & h1 {
          font-size: 2rem;
        }

        & h2 {
          font-size: 1.4rem;
          color: ${({ theme }) => theme.colors.lightText};
        }

        & p {
          font-size: 1.4rem;
          color: ${({ theme }) => theme.colors.lightText};
        }

        & p:first-child {
          font-size: 2rem;
          font-weight: 600;
          color: ${({ theme }) => theme.colors.lightContrast};
          & .level {
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
        justify-content: space-between;
      }
      .profile-links {
        width: 100%;
        margin-top: 2rem;
        font-size: 2.2rem;
        display: grid;
        grid-template-columns: 15% 15% 15% 15%;
        align-items: flex-start;
      }
    }
  }

  .profile-posts {
    padding: 4rem 1rem;
    padding-bottom: 8rem;
    border-top: 1px solid ${({ theme }) => theme.colors.namesakeText};
  }

  @media (min-width: 1100px) {
    .edit-profile {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding: 0 3rem;
      margin-top: -6rem;
      margin-bottom: 4rem;
      & button {
        padding: 0.8rem 2rem;
        font-size: 1.6rem;
      }
    }

    & .avatar-profile {
      width: 124px;
      height: 124px;
      margin: 0;
      margin-left: 4rem;
      margin-top: -4rem;
    }

    main {
      padding-top: 6rem;

      & section {
        padding: 1rem 4rem;
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
          & h1 {
            font-size: 2.4rem;
          }

          & h2 {
            font-size: 1.6rem;
            color: ${({ theme }) => theme.colors.lightText};
            margin-top: 0.4rem;
          }

          & p:first-child {
            font-size: 2.4rem;
            margin-top: 0;
          }

          & p {
            font-size: 1.6rem;
            margin-left: 6rem;
            margin-top: 0.4rem;
            font-weight: 700;
            & .level {
              margin-left: 0.8rem;
              padding: 0 1rem !important;
            }
          }
        }

        .mobile-profile-follows {
          display: none;
        }

        .profile-follows {
          margin-top: 2rem;
          display: block;
          font-size: 1.8rem;
          & p:first-child {
            margin-bottom: 0.4rem;
            font-size: 1.8rem;
          }

          & p {
            font-size: 1.8rem;
            color: ${({ theme }) => theme.colors.lightContrast};
          }
        }

        .bio {
          font-size: 1.6rem;
          width: 80%;
          grid-area: bio;
        }

        .profile-links {
          font-size: 2.8rem;
          grid-area: links;
          margin-top: 4rem;
          width: 180px;
          display: grid;
          grid-template-columns: 19% 19% 19% 19%;
          justify-content: space-between;
          justify-self: flex-end;
          direction: rtl;
          & a {
            text-align: right;
          }
        }
      }
    }

    .profile-posts {
      width: 100%;
      margin-top: 2rem;
      padding: 2rem 25%;
    }
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
