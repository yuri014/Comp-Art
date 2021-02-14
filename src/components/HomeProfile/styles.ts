import styled from 'styled-components';

const HomeProfileContainer = styled.aside`
  position: fixed;
  height: 100%;
  width: 20%;
  padding: 2rem 0;
  border-radius: 4px;
  display: grid;
  grid-template-rows: 15% 5% 40% 20%;
  align-items: flex-start;
  color: ${props => props.theme.colors.lightContrast};
  font-family: ${props => props.theme.fonts.primary};
  max-width: 280px;
  max-height: 568px;
  overflow-y: auto;

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
      font-size: 1.4rem;
      & .profile-connections {
        margin-top: 2px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 1.2rem;
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
    font-size: 1.6rem;
    display: flex;
    justify-items: center;
    justify-content: center;
    font-weight: 600;
    & .level {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      & span {
        background-color: ${props => props.theme.colors.mainColor};
        padding: 0 1rem;
        border-radius: 2px;
        color: ${props => props.theme.colors.backgroundColor};
        margin-left: 2rem;
      }
    }
    & .xp {
      margin-left: 1rem;
      width: 100%;
      display: grid;
      grid-template-columns: 20% 70%;
      align-items: center;
    }
  }

  .profile-buttons {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 2rem;
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
    font-size: 1.4rem;
    & h3 {
      display: flex;
      align-items: center;
    }
  }

  @media (max-width: 992px) {
    grid-template-rows: 12% 8% 40% 40% !important;
    position: unset;
    left: unset;
    background: ${props => props.theme.colors.mainGradient};
    width: 88vw;
    height: 100vh;
    overflow-y: auto;
    padding: 4rem;
    padding-right: 2rem;
    border-radius: 0;

    .profile {
      & figure {
        height: 48px;
        width: 48px;
        box-shadow: 0 0 7px ${props => props.theme.colors.backgroundColor};
      }

      & .profile-info {
        margin-left: 1rem;
        font-size: 1.1rem;
        & .profile-connections {
          margin-top: 2px;
          display: flex;
          flex-direction: row !important;
          align-items: center;
          justify-content: space-between;
          font-size: 1.2rem;
          & p {
            &:first-child {
              padding-right: 0.4rem !important;
              margin-right: 0.4rem !important;
              border-right: 1px solid
                ${props => props.theme.colors.lightContrast};
            }
          }
        }
      }
    }

    .profile-reputation {
      font-size: 1.6rem;
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
          margin-left: 1rem;
        }
      }
      & .xp {
        margin-left: 0rem;
        display: grid;
        grid-template-columns: 15% 70%;
        align-items: center;
      }
    }

    .profile-hashtags {
      display: block !important;
      margin-top: 2rem;
      padding-bottom: 0;
      font-size: 1.2rem;
    }
  }

  @media (max-width: 1224px) {
    grid-template-rows: 20% 10% 40% 40%;
    .profile-reputation {
      display: flex;
      flex-direction: column;
      & .xp {
        margin-top: 1rem;
        margin-left: 0rem;
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
