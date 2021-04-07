import styled from 'styled-components';

const SuggestedProfilesContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryBackgroundColor};
  border-radius: 5px;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.themeColor};
  box-shadow: ${({ theme }) => theme.colors.mainShadow};

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

      p {
        font-size: 1.4rem;
        font-weight: bold;
      }

      span {
        font-size: 1.2rem;
        color: ${({ theme }) => theme.colors.gray};
      }
    }

    button {
      color: ${({ theme }) => theme.colors.pink};
      font-weight: bold;
      cursor: pointer;
      border: 1px solid ${({ theme }) => theme.colors.pink};
      background-color: transparent;
      border-radius: 30px;
      padding: 0.4rem 1rem;
      font-size: 1.2rem;
      transition: 0.2s ease-out;

      &:hover {
        background-color: ${({ theme }) => theme.colors.pink};
        color: ${({ theme }) => theme.colors.secondaryBackgroundColor};
      }
    }
  }
`;

export default SuggestedProfilesContainer;
