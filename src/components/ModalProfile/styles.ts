import styled from 'styled-components';

const ModalProfileContainer = styled.div`
  margin-top: 3rem;

  .modal-content {
    min-height: 15rem;
    max-height: 30rem;
    overflow-x: auto;

    .profile {
      background-color: ${({ theme }) => theme.colors.lightSecondaryBackground};
      padding: 2rem;
      border-radius: 5px;
      transition: filter 0.3s ease;
      display: flex;
      justify-content: space-between;
      margin-bottom: 2rem;

      a,
      .loading {
        display: flex;
        align-items: flex-start;
      }

      .loading {
        .profile-content {
          .first-row,
          .second-row {
            max-width: unset;
          }
        }
      }

      &:hover {
        filter: brightness(1.2);
      }

      img {
        height: 5rem;
        width: 5rem;
        border-radius: 50%;
      }

      .profile-content {
        .first-row {
          font-size: 1.4rem;
          display: flex;
          align-items: center;
          color: ${({ theme }) => theme.colors.themeColor};
          max-width: 11rem;

          & > * {
            margin-left: 1rem;
          }

          .level {
            display: none;
            background-color: ${({ theme }) => theme.colors.mainColor};
            color: ${({ theme }) => theme.colors.lightSecondaryBackground};
            padding: 0 0.6rem;
            border-radius: 4px;
            font-weight: bold;

            @media (min-width: 768px) {
              display: block;
            }
          }

          @media (min-width: 1100px) {
            max-width: 25rem;
          }
        }

        .second-row {
          max-width: 11rem;
          p {
            color: ${({ theme }) => theme.colors.darkGray};
            font-size: 1.4rem;
            margin-left: 1rem;
          }

          .bio {
            color: ${({ theme }) => theme.colors.themeColor};
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          @media (min-width: 1100px) {
            max-width: 25rem;
          }
        }
      }
    }

    @keyframes modal-background {
      from {
        height: 0;
      }
      to {
        height: 100%;
      }
    }

    @keyframes modal-start {
      from {
        transform: scale(0);
      }
      to {
        transform: scale(1);
      }
    }
  }
`;

export default ModalProfileContainer;
