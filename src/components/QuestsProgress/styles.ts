import styled from 'styled-components';

const QuestsProgressContainer = styled.aside`
  position: fixed;
  top: 0;
  margin-top: 8rem;
  width: 20%;
  max-width: 280px;
  padding: 2rem 0;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.lightContrast};
  font-size: 2rem;
  font-family: ${({ theme }) => theme.fonts.primary};

  & h5 {
    text-align: center;
  }

  .daily-quests {
    margin-top: 2rem;
    border: 1px solid ${({ theme }) => theme.colors.lightContrast};
    border-radius: 2px;
    display: flex;
    padding: 1rem;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.mainColor};
    & h6 {
      color: ${({ theme }) => theme.colors.lightContrast};
      margin-right: 1rem;
    }
  }
`;

export default QuestsProgressContainer;
