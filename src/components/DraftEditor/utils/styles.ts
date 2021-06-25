import styled from 'styled-components';

const DescriptionCounterContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 1.4rem;

  .counter {
    color: ${({ theme }) => theme.colors.themeColor};
    margin-right: 0.5rem;

    &-limit {
      margin-right: 1rem;
      color: ${({ theme }) => theme.colors.error};
    }
  }

  .background-circle {
    position: absolute;
  }
`;

export default DescriptionCounterContainer;
