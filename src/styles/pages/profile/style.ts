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
    margin: 0 auto;
    z-index: 2;
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
        font-size: 20px;
        font-weight: 600;
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

    .follows-and-links {
      margin-top: 2rem;
      width: 100%;
      display: grid;
      grid-template-columns: 45% 50%;
      align-items: center;
      justify-content: space-between;
      font-size: 18px;
      & .profile-links {
        font-size: 22px;
        display: grid;
        grid-template-columns: 33% 33% 33%;
        grid-row: 100% 100%;
        align-items: center;
        justify-content: space-between;
        & a {
          text-align: right;
        }

        .additional-link {
          color: ${props => props.theme.colors.mainColor};
        }
      }
    }
  }
`;

export default ProfileContainer;
