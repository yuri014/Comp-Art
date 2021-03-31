import styled from 'styled-components';

export const LabelInputContainer = styled.label`
  display: flex;
  flex-direction: column;
`;

export const InputContainer = styled.input`
  padding: 1.4rem 2rem;
  background-color: ${props => props.theme.colors.backgroundColor};
  border: none;
  border-radius: 5px;
  margin-bottom: 2rem;

  &:focus {
    outline: 1px solid #949494;
  }
`;
