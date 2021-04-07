import styled from 'styled-components';

const HomeProfileContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryBackgroundColor};
  color: ${({ theme }) => theme.colors.themeColor};
  box-shadow: ${({ theme }) => theme.colors.mainShadow};
  height: 100%;
  padding: 2rem;

  .profile {
    display: flex;
    align-items: center;

    figure {
      height: 7rem;
      width: 7rem;
      box-shadow: ${({ theme }) => theme.colors.mainShadow};
      border-radius: 50%;
      img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .profile-info {
      display: flex;
      flex-direction: column;
      margin-left: 2rem;

      h1 {
        font-size: 1.6rem;
      }

      h2 {
        color: ${({ theme }) => theme.colors.mainColor};
      }

      p,
      h2 {
        font-size: 1.2rem;
      }
    }
  }

  .profile-reputation {
    margin-top: 1rem;
    font-size: 1.2rem;
    font-weight: 600;

    .xp,
    .level {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .xp {
      margin-bottom: 0.2rem;
    }
  }

  .profile-buttons {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 1.6rem;
    a {
      margin-top: 2rem;
      display: flex;
      align-items: center;
      color: ${({ theme }) => theme.colors.themeColor};
      transition: text-shadow 0.2s ease-in;
      &:hover {
        text-shadow: 1px 1px 4px ${({ theme }) => theme.colors.lightContrast};
      }

      p {
        margin-left: 1rem;
      }

      .post-icon {
        color: ${({ theme }) => theme.colors.themeColor};
      }
    }
  }

  .post-button {
    background-color: ${({ theme }) => theme.colors.mainColor};
    width: 80%;
    margin: 0 auto;
    margin-top: 2rem;
    border-radius: 5px;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    gap: 0.4rem;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.namesakeText};
  }

  @media (min-width: 992px) {
    height: unset;
    border-radius: 5px;
  }

  @media (min-width: 1200px) {
    .post-button {
      width: 60%;
    }
  }
`;

export default HomeProfileContainer;
