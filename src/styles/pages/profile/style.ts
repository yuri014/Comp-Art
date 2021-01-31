import styled from 'styled-components';

const ProfileContainer = styled.div`
  color: ${props => props.theme.colors.lightContrast};

  & .cover-profile {
    width: 100%;
    height: 12rem;
    border-bottom: 1px solid ${props => props.theme.colors.mainColor};
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
    & img {
      box-shadow: 0 0 4px ${props => props.theme.colors.namesakeText};
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
      border: 1px solid ${props => props.theme.colors.mainColor};
      color: ${props => props.theme.colors.lightContrast};
      border-radius: 4px;
      padding: 0.4rem 1rem;
      background: none;
      transition: 0.4s ease;
      cursor: pointer;
      font-size: 14px;
      font-family: ${props => props.theme.fonts.display};
      &:hover {
        box-shadow: 0 0 4px 2px ${props => props.theme.colors.lightText};
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
          font-size: 20px;
        }

        & h2 {
          font-size: 14px;
          color: ${props => props.theme.colors.lightText};
        }

        & p {
          font-size: 14px;
          color: ${props => props.theme.colors.lightText};
        }

        & p:first-child {
          font-size: 20px;
          font-weight: 600;
          color: ${props => props.theme.colors.lightContrast};
          & .level {
            background-color: ${props => props.theme.colors.mainColor};
            color: ${props => props.theme.colors.backgroundColor};
            padding: 0 0.8rem;
            border-radius: 4px;
          }
        }
      }

      .bio {
        margin-top: 2rem;
        width: 100%;
        font-size: 14px;
        border: 1px solid ${props => props.theme.colors.namesakeText};
        border-radius: 4px;
        padding: 1rem;
      }

      .profile-follows {
        display: none;
      }

      .mobile-profile-follows {
        width: 100%;
        margin-top: 2rem;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .profile-links {
        width: 100%;
        margin-top: 2rem;
        font-size: 22px;
        display: grid;
        grid-template-columns: 15% 15% 15% 15%;
        align-items: flex-start;
      }
    }
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
        font-size: 16px;
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
        grid-template-columns: 35% 45% 35%;
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
            font-size: 24px;
          }

          & h2 {
            font-size: 16px;
            color: ${props => props.theme.colors.lightText};
            margin-top: 0.4rem;
          }

          & p:first-child {
            font-size: 24px;
            margin-top: 0;
          }

          & p {
            font-size: 16px;
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
          font-size: 18px;
          & p:first-child {
            margin-bottom: 0.4rem;
            font-size: 18px;
          }

          & p {
            font-size: 18px;
            color: ${props => props.theme.colors.lightContrast};
          }
        }

        .bio {
          font-size: 16px;
          width: 80%;
          grid-area: bio;
        }

        .profile-links {
          font-size: 28px;
          grid-area: links;
          margin-top: 4rem;
          & a {
            text-align: right;
          }
        }
      }
    }
  }
`;

export default ProfileContainer;
