import styled from 'styled-components';

const SuggestedProfilesContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryBackgroundColor};
  border-radius: 5px;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.themeColor};
  box-shadow: ${({ theme }) => theme.colors.mainShadow};
  width: 20%;
  margin-left: 1rem;
  margin-top: 18rem;

  h4 {
    font-size: 1.8rem;
    text-align: center;
    font-weight: bold;
  }

  .suggested-profile-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2rem;

    .suggested-profile {
      display: flex;
      align-items: center;
      gap: 0.8rem;

      img {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        object-fit: fill;
      }

      .suggested-profile-info {
        p {
          max-width: 6vw;
          font-size: 1.4rem;
          font-weight: bold;

          & + p {
            font-size: 1.2rem;
            color: ${({ theme }) => theme.colors.gray};
          }
        }
      }
    }
  }

  @media (min-width: 1440px) {
    width: 19%;
    margin-left: 0;

    .suggested-profile-container {
      .suggested-profile {
        .suggested-profile-info {
          p {
            max-width: 8vw;
          }
        }
      }
    }
  }
`;

export default SuggestedProfilesContainer;
