import styled from 'styled-components';

export const LabelInputContainer = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.8rem;

  p {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }

  &.error {
    input {
      &:focus {
        border: 1px solid ${({ theme }) => theme.colors.error};
      }
    }

    span {
      color: ${({ theme }) => theme.colors.error};
      margin-top: 0.2rem;
    }
  }

  span {
    color: ${({ theme }) => theme.colors.darkGray};
    font-size: 1.2rem;
    margin-top: 0.2rem;
  }
`;

export const InputContainer = styled.input`
  padding: 1.4rem 2rem;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.themeColor};
  box-shadow: ${({ theme }) => theme.colors.secondaryShadow};
  font-family: ${({ theme }) => theme.fonts.primary};

  &:focus {
    padding: calc(1.4rem - 1px) 2rem;
    border: 1px solid #949494;
    outline: none;
  }
`;
