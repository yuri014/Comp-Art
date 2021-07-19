import styled from 'styled-components';

const ProfileSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 3rem;
  background-color: ${({ theme }) => theme.colors.secondaryBackgroundColor};
  box-shadow: ${({ theme }) => theme.colors.mainShadow};
  height: fit-content;
  z-index: 1;

  .buttons-profile {
    width: 100%;
    margin-top: 4rem;
    max-width: 48rem;

    button {
      width: 100%;
      border: none;
      color: #fff;
      padding: 1.1rem 1rem;
      cursor: pointer;
      border-radius: 5px;
      background-color: #077e76;
      transition: filter 0.225s ease;

      &.delete-account {
        background-color: ${({ theme }) => theme.colors.error};
      }

      &.edit-profile {
        background-color: #38383c;
      }

      &:hover {
        filter: brightness(0.75);
      }
    }

    .auth-buttons {
      display: flex;
      justify-content: space-between;

      button {
        width: 13rem;

        @media (min-width: 768px) {
          width: 12rem;
        }
      }
    }
  }

  .avatar-profile {
    position: relative;
    display: flex;
    justify-content: center;

    .profile-image {
      background-color: transparent;
      border: none;
      cursor: pointer;
      display: block;
      width: 11rem;
      height: 11rem;

      img {
        width: 100%;
        border-radius: 50%;
        height: 100%;
        cursor: pointer;
        border: 3px solid ${({ theme }) => theme.colors.pink};
        object-fit: cover;
      }

      p {
        font-size: 4rem;
      }
    }

    .level-badge {
      position: absolute;
      font-size: 1.3rem;
      padding: 0.6rem 1.4rem;
      border-radius: 5px;
      bottom: 0;
      background-color: ${({ theme }) => theme.colors.pink};
      color: #fff;
    }
  }

  .profile {
    margin-top: 2rem;
    width: 100%;
    max-width: 48rem;

    h1 {
      font-size: 2rem;
      width: 18.8rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    h2 {
      font-size: 1.4rem;
      color: ${({ theme }) => theme.colors.mainColor};
    }

    .profile-numbers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 3rem;

      p {
        font-size: 1.4rem;
        color: ${({ theme }) => theme.colors.themeColor};
        text-align: center;
      }

      p:first-child {
        text-align: center;
        font-size: 2rem;
        font-weight: 600;
      }

      button {
        background: transparent;
        border: none;
        cursor: pointer;
      }
    }
  }

  .bio,
  .joined {
    max-width: 48rem;
    margin-top: 3rem;
    width: 100%;
    font-size: 1.4rem;
  }

  .bio {
    word-break: break-all;
  }

  .joined {
    text-align: center;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.gray};
  }

  @media (min-width: 1100px) {
    border-radius: 5px;
    margin-top: -12rem;
  }
`;

export default ProfileSectionContainer;
