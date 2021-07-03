import styled from 'styled-components';

export const NotificationContainer = styled.div`
  padding: 0 0.5rem;
  width: 100%;
  position: relative;

  .notification-button {
    display: flex;
    color: ${({ theme }) => theme.colors.themeColor};
    width: 100%;
    border: none;
    background: transparent;
    text-align: left;
    cursor: pointer;
    border-radius: 5px;
    transition: background 0.125s ease;

    &:hover {
      background: ${({ theme }) => theme.colors.lighterSecondaryBackground};
    }

    img {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      margin-right: 1rem;
    }

    div {
      width: 79%;

      .head {
        p,
        strong {
          display: inline;
          font-size: 1.4rem;
        }

        p {
          white-space: normal;
        }
      }

      span {
        font-weight: 300;
        font-size: 1.3rem;
        color: ${({ theme }) => theme.colors.gray};
      }
    }

    .new {
      position: absolute;
      right: 2rem;
      width: 0.8rem;
      height: 0.8rem;
      background-color: ${({ theme }) => theme.colors.mainColor};
      align-self: center;
      border-radius: 50%;
      justify-self: flex-end;
      box-shadow: 0 0 0 ${({ theme }) => theme.colors.mainColor}80;
      will-change: box-shadow;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 ${({ theme }) => theme.colors.mainColor}80;
      }
      70% {
        box-shadow: 0 0 0 10px ${({ theme }) => theme.colors.mainColor}00;
      }
      100% {
        box-shadow: 0 0 0 0 ${({ theme }) => theme.colors.mainColor}00;
      }
    }
  }

  @media (min-width: 1100px) {
    width: 30rem;
  }
`;

export const NotificationMenuContainer = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.lightSecondaryBackground};
  z-index: 5;
  top: 5rem;
  padding: 0.5rem 0;
  right: 4.5rem;
  max-height: 22rem;
  overflow: auto;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;
