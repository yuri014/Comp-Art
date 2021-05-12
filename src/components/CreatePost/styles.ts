import styled from 'styled-components';

const CreatePostContainer = styled.div`
  width: 100%;
  padding: 1rem;
  margin-bottom: 2rem;
  background-color: ${({ theme }) => theme.colors.secondaryBackgroundColor};

  .editor {
    display: flex;
    align-items: flex-start;
    gap: 1rem;

    .hashtag {
      color: ${({ theme }) => theme.colors.hashtag};
    }

    img {
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      object-fit: fill;
    }

    .DraftEditor-root {
      width: 85%;
      font-size: 1.6rem;
      margin-top: 1rem;
    }
  }
`;

export default CreatePostContainer;
