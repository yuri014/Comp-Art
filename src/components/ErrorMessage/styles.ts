import styled from 'styled-components';

const ErrorMessageContainer = styled.div`
  color: ${props => props.theme.colors.danger};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 2rem;
  font-size: 18px;
  font-weight: 500;
  padding: 0.6rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.danger};
`;

export default ErrorMessageContainer;
