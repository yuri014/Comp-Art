import styled from 'styled-components';

const PressStartButtonContainer = styled.button`
  border: none;
  width: 12rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 0 auto;
  font: 400 16px ${({ theme }) => theme.fonts.display}, sans-serif;
  background-color: ${({ theme }) => theme.colors.mainColor};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.namesakeText};
  letter-spacing: 3px;
  transition: filter 1s ease, color 1s ease;
  cursor: pointer;

  a {
    color: ${({ theme }) => theme.colors.namesakeText};
  }

  :hover {
    filter: drop-shadow(1px 1px 4px ${({ theme }) => theme.colors.mainColor});
  }
`;

export default PressStartButtonContainer;
