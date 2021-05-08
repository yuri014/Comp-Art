import styled from 'styled-components';

interface HashtagsProfileContainerProps {
  isArtist: boolean;
}

export const HomeProfileContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryBackgroundColor};
  color: ${({ theme }) => theme.colors.themeColor};
  box-shadow: ${({ theme }) => theme.colors.mainShadow};
  padding: 2rem;
  width: 100%;
  height: 100vh;
  max-width: 33rem;

  .profile {
    display: flex;
    align-items: center;

    figure {
      height: 6rem;
      width: 6rem;
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

      h1,
      h2 {
        max-width: 13rem;
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
      display: flex;
      align-items: center;
      color: ${({ theme }) => theme.colors.themeColor};
      transition: text-shadow 0.2s ease-in;
      padding: 1rem;
      padding-left: 0;
      border-radius: 5px;
      transition: padding-left 0.125s ease-in;

      &:first-child {
        margin-top: 1rem;
      }

      &:hover {
        padding-left: 1rem;
        background: ${({ theme }) => theme.colors.lighterSecondaryBackground};
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

  @media (min-width: 1100px) {
    height: unset;
    border-radius: 5px;
    width: 20%;
  }

  @media (min-width: 1200px) {
    .post-button {
      width: 60%;
    }
  }

  @media (min-width: 1440px) {
    .profile {
      .profile-info {
        h1,
        h2 {
          max-width: 10vw;
        }
      }
    }
  }
`;

export const HashtagsProfileContainer = styled.div<HashtagsProfileContainerProps>`
  background-color: ${({ theme }) => theme.colors.secondaryBackgroundColor};
  color: ${({ theme }) => theme.colors.themeColor};
  box-shadow: ${({ theme }) => theme.colors.mainShadow};
  padding: 2rem;
  border-radius: 5px;
  width: 20%;
  max-width: 33rem;
  margin-top: ${props => (props.isArtist ? '36rem' : '31rem')};

  h3 {
    font-size: 1.8rem;
    text-align: center;
  }

  .hashtag-container {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;

    a {
      color: ${({ theme }) => theme.colors.themeColor};
      background-color: ${({ theme }) => theme.colors.pink};
      padding: 1rem;
      border-radius: 5px;
      font-size: 1.2rem;
    }
  }
`;
