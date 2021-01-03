import styled from 'styled-components';

const QuestsProgressContainer = styled.aside`
  position: fixed;
  top: 0;
  width: 320px;
  margin-top: 8rem;
  padding: 2rem;
  border-radius: 4px;
  color: ${props => props.theme.colors.lightContrast};
  font-size: 20px;
  font-family: ${props => props.theme.fonts.primary};

  & h5 {
    text-align: center;
  }

  .daily-quests {
    margin-top: 2rem;
    border: 1px solid ${props => props.theme.colors.lightContrast};
    border-radius: 2px;
    display: flex;
    padding: 1rem;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.mainColor};
    & h6 {
      color: ${props => props.theme.colors.lightContrast};
      margin-right: 1rem;
    }
  }
`;

export default QuestsProgressContainer;
