import styled from 'styled-components';

const TagsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  font-size: 12px;
  & * {
    margin-top: 2rem;
    margin-right: 2rem;
    cursor: pointer;
    padding: 1rem;
    background-color: ${props => props.theme.colors.lightContrast};
    color: ${props => props.theme.colors.backgroundColor};
    font-weight: 700;
    border-radius: 4px;
    text-shadow: 0 0 2px #00000050;
    transition: all 0.4s ease;
    &:hover {
      filter: brightness(0.4);
    }
  }
`;

export default TagsContainer;
