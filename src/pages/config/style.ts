import styled from 'styled-components';

const ConfigContainer = styled.div`
  background: ${({ theme }) => theme.colors.alternativeBackground};
  min-height: 100vh;

  header {
    margin-bottom: 5rem;
  }

  main {
    padding-bottom: 5rem 0;

    .config-item {
      width: 100%;
      display: flex;
      align-items: center;
      background-color: transparent;
      border: none;
      border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
      padding: 2rem;
      color: ${({ theme }) => theme.colors.themeColor};
      gap: 1rem;
      font-size: 1.6rem;

      svg {
        color: ${({ theme }) => theme.colors.mainColor};

        &.danger {
          color: ${({ theme }) => theme.colors.error};
        }
      }
    }
  }
`;

export default ConfigContainer;
