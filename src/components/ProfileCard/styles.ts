import styled from 'styled-components';

const ProfileSimpleCardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.lightSecondaryBackground};
  padding: 2rem;
  border-radius: 5px;
  transition: filter 0.3s ease;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;

  button {
    width: auto;
  }

  .profile-content {
    .first-row {
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      color: ${({ theme }) => theme.colors.themeColor};
      max-width: 11rem;

      & > * {
        margin-left: 1rem;
      }

      .follows-you {
        display: none;
        background-color: ${({ theme }) => theme.colors.darkGray};
        color: ${({ theme }) => theme.colors.lightSecondaryBackground};
        padding: 0.2rem 0.6rem;
        border-radius: 4px;
        font-weight: bold;
        font-size: 1.3rem;

        @media (min-width: 768px) {
          display: block;
        }
      }

      @media (min-width: 1100px) {
        max-width: 25rem;
      }
    }

    .second-row {
      max-width: 11rem;
      p {
        color: ${({ theme }) => theme.colors.darkGray};
        font-size: 1.4rem;
        margin-left: 1rem;
      }

      .bio {
        color: ${({ theme }) => theme.colors.themeColor};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      @media (min-width: 1100px) {
        max-width: 25rem;
      }
    }
  }

  a,
  .loading {
    display: flex;
    align-items: flex-start;
  }

  .loading {
    .profile-content {
      .first-row,
      .second-row {
        max-width: unset;
      }
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.lighterSecondaryBackground};
  }

  img {
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
  }
`;

export default ProfileSimpleCardContainer;
