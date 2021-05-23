import styled from 'styled-components';

const CreatePostContainer = styled.div`
  margin-bottom: 2rem;
  background-color: ${({ theme }) => theme.colors.secondaryBackgroundColor};
  display: grid;
  grid-template-columns: 5rem 80%;
  justify-content: space-between;
  padding: 2rem 1rem;

  /* Custom mention popover */

  .mnw6qvm {
    color: ${({ theme }) => theme.colors.themeColor};
    text-decoration: none;
    background-color: ${({ theme }) => theme.colors.popoverBackground};
    border: none;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  .m6zwb4v {
    color: ${({ theme }) => theme.colors.pink};
    background-color: transparent;
  }

  .mention {
    padding: 0.5rem 1rem;
    font-size: 1.4rem;
    font-weight: 600;
    transition: filter 0.225s ease-in-out;

    &:hover {
      background-color: ${({ theme }) => theme.colors.popoverBackground};
      filter: brightness(1.25);
    }
  }

  .mentionSuggestionsEntryContainer {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .mentionSuggestionsEntryContainerRight {
    width: 100%;
    padding-left: 0.8rem;
  }

  .mentionSuggestionsEntryText,
  .mentionSuggestionsEntryTitle {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mentionSuggestionsEntryTitle {
    font-size: 1.2rem;
    font-weight: 300;
    color: ${({ theme }) => theme.colors.darkGray};
  }

  .mentionSuggestionsEntryAvatar {
    display: block;
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
  }
  /* End mention popover */

  img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    object-fit: fill;
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
      .hashtag {
        color: ${({ theme }) => theme.colors.hashtag};
      }

      .counter-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 1.4rem;

        .counter {
          color: ${({ theme }) => theme.colors.themeColor};
          margin-right: 1rem;

          &-limit {
            margin-right: 1rem;
            color: ${({ theme }) => theme.colors.error};
          }
        }

        .background-circle {
          position: absolute;
        }
      }

      .DraftEditor-root {
        width: 100%;
        font-size: 1.6rem;
        margin-top: 1rem;
        padding-bottom: 0.4rem;
      }

      .media {
        position: relative;
        width: 100%;
        height: 14rem;
        margin: 2rem auto;

        button {
          cursor: pointer;
          top: 4px;
          right: 4px;
          position: absolute;
          background-color: rgba(0, 0, 0, 0.9);
          color: white;
          border-radius: 50%;
          padding: 0.6rem;
          display: grid;
          place-content: center;
          border: none;
          font-size: 1.8rem;

          &:focus,
          &:hover {
            background-color: rgb(35, 40, 43, 0.9);
            outline: none;
          }

          &:focus {
            border: 2px solid ${({ theme }) => theme.colors.darkGray};
            padding: calc(0.6rem - 2px);
          }
        }

        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
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
