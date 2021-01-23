import styled from 'styled-components';

const HomeProfileContainer = styled.aside`
  position: fixed;
  left: 0;
  width: 24%;
  height: 80vh;
  padding: 2rem 0;
  padding-left: 4rem;
  border-radius: 4px;
  display: grid;
  grid-template-rows: 15% 5% 40% 40%;
  align-items: flex-start;
  color: ${props => props.theme.colors.lightContrast};
  font-family: ${props => props.theme.fonts.primary};

  .profile {
    display: flex;
    align-items: center;
    & figure {
      height: 60px;
      width: 60px;
      box-shadow: 0 0 7px #000;
      border-radius: 50%;
      & img {
        border-radius: 50%;
        object-fit: cover;
      }
    }

    & .profile-info {
      margin-left: 2rem;
      font-size: 14px;
      & .profile-connections {
        margin-top: 2px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 12px;
        & p {
          &:first-child {
            padding-right: 1rem;
            margin-right: 1rem;
            border-right: 1px solid ${props => props.theme.colors.lightContrast};
          }
        }
      }
    }
  }

  .profile-reputation {
    font-size: 16px;
    display: grid;
    grid-template-columns: 40% 60%;
    font-weight: 600;
    & .level {
      display: flex;
      align-items: center;
      & span {
        background-color: ${props => props.theme.colors.mainColor};
        padding: 0 1rem;
        border-radius: 2px;
        color: ${props => props.theme.colors.backgroundColor};
        margin-left: 2rem;
      }
    }
    & .xp {
      display: grid;
      grid-template-columns: 20% 70%;
      align-items: center;
    }
  }

  .profile-buttons {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 20px;
    & a {
      margin-top: 2rem;
      display: flex;
      align-items: center;
      color: ${props => props.theme.colors.lightContrast};
      transition: text-shadow 0.2s ease-in;
      &:hover {
        text-shadow: 1px 1px 4px ${props => props.theme.colors.lightContrast};
      }
      & p {
        margin-left: 1rem;
      }

      & .post-icon {
        color: ${props => props.theme.colors.mainColor};
      }
    }
  }

  .profile-hashtags {
    margin-top: 4rem;
    padding-bottom: 2rem;
    font-size: 14px;
    & h3 {
      display: flex;
      align-items: center;
    }
  }

  @media (max-width: 1100px) {
    display: none;
  }

  @media (max-width: 1224px) {
    grid-template-rows: 20% 10% 40% 40%;
    .profile-reputation {
      display: flex;
      flex-direction: column;
      & .xp {
        margin-top: 1rem;
      }
    }

    .profile-buttons {
      margin-top: 1rem;
    }

    .profile {
      & .profile-info {
        & .profile-connections {
          flex-direction: column;
          align-items: flex-start;
          & p {
            &:first-child {
              padding-right: 0;
              margin-right: 0;
              border-right: 0 solid ${props => props.theme.colors.lightContrast};
            }
          }
        }
      }
    }

    .profile-hashtags {
      display: none;
    }
  }
`;

export default HomeProfileContainer;
