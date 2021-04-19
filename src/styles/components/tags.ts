import styled from 'styled-components';

const TagsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1rem;

  button {
    font-size: 1.4rem;
    cursor: pointer;
    padding: 1rem;
    border: none;
    background-color: ${({ theme }) => theme.colors.pink};
    color: ${({ theme }) => theme.colors.themeColor};
    font-weight: 700;
    border-radius: 5px;
    transition: all 0.4s ease;

    &:hover {
      filter: brightness(0.4);
    }
  }
`;

export default TagsContainer;
