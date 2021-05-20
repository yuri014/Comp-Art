import styled from 'styled-components';

const TextBoxContainer = styled.div`
  font-size: 1.6rem;
  overflow: hidden;
  max-width: 700px;
  word-break: break-all;

  span {
    cursor: pointer;

    &.hashtag {
      color: ${({ theme }) => theme.colors.hashtag};
    }

    &.mention {
      color: ${({ theme }) => theme.colors.pink};
    }
  }

  a {
    color: ${({ theme }) => theme.colors.link};
  }
`;

export default TextBoxContainer;