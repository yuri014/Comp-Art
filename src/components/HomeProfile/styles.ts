import styled from 'styled-components';

const HomeProfileContainer = styled.aside`
  position: fixed;
  width: 320px;
  height: 80vh;
  padding: 2rem;
  border-radius: 4px;
  overflow-y: auto;
  display: grid;
  grid-template-rows: 15% 5% 40% 40%;
  align-items: flex-start;
  color: ${props => props.theme.colors.lightContrast};
  font-family: ${props => props.theme.fonts.primary};
  background: ${props => props.theme.colors.mainGradient};

  .profile {
    display: flex;
    align-items: center;
    & img {
      height: 48px;
      width: 48px;
      border-radius: 50%;
      object-fit: fill;
    }

    & .profile-info {
      margin-left: 2rem;
      width: 70%;
      font-size: 14px;
      & .profile-connections {
        margin-top: 2px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
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
      & div {
        display: grid;
        grid-template-columns: 80% 15%;
        align-items: center;
        justify-content: space-between;
      }
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
    & .hashtags {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      font-size: 12px;
      & span {
        margin-top: 2rem;
        margin-right: 2rem;
        cursor: pointer;
        padding: 1rem;
        background-color: ${props => props.theme.colors.lightContrast};
        color: ${props => props.theme.colors.backgroundColor};
        font-weight: 700;
        border-radius: 4px;
        text-shadow: 0 0 2px #00000050;
        transition: all 0.4s ease;
        &:hover {
          filter: brightness(0.4);
        }
      }
    }
  }

  @media (max-width: 1100px) {
    display: none;
  }
`;

export default HomeProfileContainer;
