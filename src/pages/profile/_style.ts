import styled from 'styled-components';

export const ProfileContainer = styled.div`
  color: ${({ theme }) => theme.colors.lightContrast};
  width: 100vw;

  .cover-profile {
    width: 100%;
    height: 12rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.mainColor};
    z-index: 1;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .avatar-profile {
    width: 84px;
    height: 84px;
    z-index: 2;
    margin-left: 2rem;
    margin-top: -4rem;
    border-radius: 50%;
    cursor: pointer;

    & img {
      box-shadow: 0 0 4px ${({ theme }) => theme.colors.namesakeText};
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
`;

export const EditProfileContainer = styled.main`
  display: grid;
  place-items: center;
  margin-top: 2rem;
  padding-bottom: 8rem;

  @media (min-width: 1100px) {
    padding-top: 8rem;
    padding-bottom: 2rem;
    margin: 0 auto;
    width: 50%;
  }
`;
