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
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background-color: ${({ theme }) => theme.colors.pink};
    color: ${({ theme }) => theme.colors.themeColor};
    font-weight: 700;
    border-radius: 5px;
    transition: all 0.4s ease;
    margin-bottom: 2rem;

    &:hover {
      filter: brightness(0.4);
    }
  }
`;

export default TagsContainer;
