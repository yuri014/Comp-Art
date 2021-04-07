import styled from 'styled-components';

const QuestsProgressContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryBackgroundColor};
  border-radius: 5px;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.themeColor};
  box-shadow: ${({ theme }) => theme.colors.mainShadow};

  h5 {
    font-size: 1.8rem;
    text-align: center;
    font-weight: bold;
  }

  .quest-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.2rem;
    font-weight: bold;
    background-color: ${({ theme }) => theme.colors.lightSecondaryBackground};
    padding: 1rem;
    border-radius: 5px;
    margin-top: 2rem;

    div {
      display: inherit;
      align-items: inherit;
      justify-content: inherit;
      gap: 1rem;
    }

    .quest-icon-complete {
      color: white;
      font-size: 0.8rem;
      background: ${({ theme }) => theme.colors.lightGreen};
      border-radius: 50%;
      padding: 0.3rem;
    }

    & + .quest-container {
      margin-top: 1rem;
    }
  }
`;

export default QuestsProgressContainer;
