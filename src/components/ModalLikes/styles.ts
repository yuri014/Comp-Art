import styled from 'styled-components';

const ModalLikesContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  animation: modal-background 0.3s ease-in-out;
  transform-origin: top;

  .modal-content {
    width: 80%;
    height: 40rem;
    max-width: 60rem;
    overflow-y: auto;
    position: relative;
    margin: auto;
    background-color: #1e2939;
    border-radius: 8px;
    border: 2px solid ${props => props.theme.colors.mainColor};
    color: white;
    text-align: left;
    padding: 1rem 0;
    animation: modal-start 0.7s ease-in-out 0.3s forwards;
    transform-origin: center;
    transform: scale(0);

    a {
      color: ${props => props.theme.colors.lightContrast};
    }

    .profile {
      display: flex;
      align-items: flex-start;
      padding: 0.6rem 2rem;
      border-bottom: 1px solid ${props => props.theme.colors.lightText};

      img {
        height: 4rem;
        width: 4rem;
        border-radius: 50%;
      }

      .profile-content {
        font-size: 1.6rem;

        .profile-info {
          display: flex;

          & > * {
            margin-left: 1rem;
          }

          p {
            color: ${props => props.theme.colors.blueContrast};
          }

          .level {
            background-color: ${props => props.theme.colors.mainColor};
            padding: 0 0.6rem;
            border-radius: 4px;
          }
        }

        .bio {
          font-size: 1.4rem;
          white-space: nowrap;
          max-width: 20rem;
          margin-left: 1rem;
          overflow: hidden;
          text-overflow: ellipsis;

          @media (min-width: 768px) {
            max-width: 50rem;
          }
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
`;

export default ModalLikesContainer;
