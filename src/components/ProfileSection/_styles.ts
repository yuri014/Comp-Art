import styled from 'styled-components';

const ProfileSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 3rem;
  background-color: ${({ theme }) => theme.colors.secondaryBackgroundColor};
  box-shadow: ${({ theme }) => theme.colors.mainShadow};

  .avatar-profile {
    position: relative;
    display: flex;
    justify-content: center;

    img {
      width: 11rem;
      border-radius: 50%;
      height: 11rem;
      box-shadow: 0 0 4px ${({ theme }) => theme.colors.namesakeText};
      cursor: pointer;
      border: 3px solid ${({ theme }) => theme.colors.pink};
      object-fit: cover;
    }

    p {
      position: absolute;
      font-size: 1.3rem;
      padding: 0.6rem 1.4rem;
      border-radius: 5px;
      bottom: 0;
      background-color: ${({ theme }) => theme.colors.pink};
    }
  }

  .profile {
    margin-top: 2rem;
    width: 100%;

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
    }
  }

  .bio,
  .joined {
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
    color: #949494;
  }
`;

export default ProfileSectionContainer;
