import styled from 'styled-components';

export const LabelInputContainer = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

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
      margin-top: 1rem;
      font-size: 1.2rem;
    }
  }
`;

export const InputContainer = styled.input`
  padding: 1.4rem 2rem;
  background-color: ${props => props.theme.colors.backgroundColor};
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.themeColor};

  &:focus {
    border: 1px solid #949494;
    outline: none;
  }
`;
