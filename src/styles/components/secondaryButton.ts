import styled from 'styled-components';

const CASecondaryButton = styled.button`
  color: ${({ theme }) => theme.colors.pink};
  font-weight: bold;
  width: 8rem;
  margin: auto 0;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.pink};
  background-color: transparent;
  border-radius: 30px;
  padding: 0.4rem 1rem;
  font-size: 1.2rem;
  transition: 0.2s ease-out;

  &.main-color {
    color: ${({ theme }) => theme.colors.mainColor};
    border: 1px solid ${({ theme }) => theme.colors.mainColor};

    &:hover,
    &.active {
      background-color: ${({ theme }) => theme.colors.mainColor};
      color: ${({ theme }) => theme.colors.secondaryBackgroundColor};
    }
  }

  &:hover,
  &.active {
    background-color: ${({ theme }) => theme.colors.pink};
    color: ${({ theme }) => theme.colors.secondaryBackgroundColor};
  }
`;

export default CASecondaryButton;
