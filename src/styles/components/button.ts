import styled from 'styled-components';

const CAButton = styled.button`
  width: 100%;
  padding: 1.4rem;
  border-radius: 5px;
  border: none;
  background-color: ${({ theme }) => theme.colors.mainColor};
  color: ${({ theme }) => theme.colors.themeColor};
  margin-bottom: 2rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  font-weight: 700;

  &:hover {
    border-radius: 10px;
  }
`;

export default CAButton;
