import styled from 'styled-components';

const ErrorMessageContainer = styled.div`
  font-size: 16px;
  color: ${props => props.theme.colors.danger};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  font-weight: 500;
  padding: 0.6rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.danger};

  .danger-icon {
    color: ${props => props.theme.colors.danger};
  }

  @media (min-width: 992px) {
    font-size: 18px;
    padding: 0.6rem 1rem;
    justify-content: flex-start;
  }
`;

export default ErrorMessageContainer;
