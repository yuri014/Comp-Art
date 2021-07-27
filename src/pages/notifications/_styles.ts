import styled from 'styled-components';

const NotificationPageContainer = styled.div`
  background: ${({ theme }) => theme.colors.alternativeBackground};
  min-height: 100vh;

  main {
    padding: 5rem 0;

    .notification-item {
      border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
      padding: 1rem 0;
    }
  }
`;

export default NotificationPageContainer;
