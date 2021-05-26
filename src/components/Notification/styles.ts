import styled from 'styled-components';

export const NotificationContainer = styled.div`
  padding: 0 1.6rem;
  width: 35rem;

  button {
    display: grid;
    grid-template-columns: 13% 78% 5%;
    color: ${({ theme }) => theme.colors.themeColor};
    width: 100%;
    justify-content: space-between;
    border: none;
    background: transparent;
    text-align: left;
    cursor: pointer;

    img {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
    }

    div {
      .head {
        p,
        strong {
          display: inline;
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
`;

export const NotificationMenuContainer = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.secondaryBackgroundColor};
  z-index: 5;
  top: 6rem;
  padding: 1rem 0;
  right: 4.5rem;
  height: 22rem;
  overflow: auto;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;
