import styled from 'styled-components';

const DraftEditorComponent = styled.div`
  display: contents;

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
    font-size: 1.3rem;
    font-weight: 300;
    color: ${({ theme }) => theme.colors.darkGray};
  }

  .mentionSuggestionsEntryAvatar {
    display: block;
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;

    p {
      font-size: 1.6rem;
    }
  }
  /* End mention popover */

  .hashtag {
    color: ${({ theme }) => theme.colors.hashtag};
  }

  .public-DraftEditorPlaceholder-inner {
    color: ${({ theme }) => theme.colors.gray};
  }
`;

export default DraftEditorComponent;
