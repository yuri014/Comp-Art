import styled from 'styled-components';

const CreatePostContainer = styled.div`
  margin-bottom: 2rem;
  background-color: ${({ theme }) => theme.colors.secondaryBackgroundColor};
  display: grid;
  grid-template-columns: 5rem 80%;
  justify-content: space-between;
  padding: 2rem 1rem;

  .profile-image {
    width: 5rem;
    height: 5rem;

    img {
      object-fit: fill;
    }
  }

  form {
    width: 100%;
    padding-right: 1.2rem;

    .buttons {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid ${({ theme }) => theme.colors.darkGray};

      button {
        background: ${({ theme }) => theme.colors.pink};
        color: #fff;
        border: none;
        cursor: pointer;
        padding: 1rem;
        border-radius: 5px;
        font-weight: 600;
        transition: filter 0.225s ease-out;

        &:focus,
        &:hover {
          filter: brightness(0.75);
        }

        &.disabled {
          opacity: 0.6;
        }

        &[type='submit'] {
          margin-left: 1rem;
        }
      }

      div {
        display: flex;

        input {
          display: none;
        }

        .icon-button {
          background: transparent;
          color: ${({ theme }) => theme.colors.mainColor};
          font-size: 2rem;
          margin-right: 1rem;
          padding: 1rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.225s ease-out;

          &:focus,
          &:hover {
            background-color: ${({ theme }) => theme.colors.mainColor}20;
          }

          &:focus {
            border: 2px solid ${({ theme }) => theme.colors.mainColor};
            padding: calc(1rem - 2px);
            outline: none;
          }
        }
      }
    }

    .editor {
      .DraftEditor-root {
        width: 100%;
        font-size: 1.6rem;
        margin-top: 1rem;
        padding-bottom: 0.4rem;
      }
    }
  }

  @media (min-width: 768px) {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 2rem;
    padding: 4rem;
    border-radius: 5px;
    grid-template-columns: 5rem 88%;
  }

  @media (min-width: 1100px) {
    padding: 2rem;
    width: 100%;
    grid-template-columns: 5rem 90%;
  }
`;

export default CreatePostContainer;
