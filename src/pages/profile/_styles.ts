import styled from 'styled-components';

const ProfileContainer = styled.div`
  color: ${({ theme }) => theme.colors.themeColor};

  .cover-profile {
    width: 100%;
    height: 14rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.mainColor};

    &.cover-placeholder {
      background-color: ${({ theme }) => theme.colors.mainColor};
    }

    button {
      width: 100%;
      height: inherit;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .profile-links {
      font-size: 1.2rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.5rem;
      justify-content: flex-end;
      padding-right: 0.4rem;
      padding-bottom: 0.4rem;
      position: absolute;
      top: 7rem;
      right: 2rem;

      a {
        background: ${({ theme }) => theme.colors.secondaryBackgroundColor};
        width: 2.5rem;
        height: 2.5rem;
        padding: 0.4rem;
        border-radius: 50%;
        display: inline-grid;
        place-items: center;
      }

      div > * {
        margin-left: 1.6rem;
      }
    }
  }

  .buttons-profile {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 4rem;

    button {
      width: 12rem;
      border: none;
      color: #fff;
      padding: 1.1rem 1rem;
      border-radius: 5px;
      background-color: ${({ theme }) => theme.colors.mainColor};

      &.sponsorship {
        background-color: ${({ theme }) => theme.colors.purple};
      }

      &.edit-profile {
        background-color: #38383c;
      }
    }
  }

  .profile-posts {
    margin-top: 2rem;
    padding-bottom: 8rem;
  }
`;

export default ProfileContainer;
