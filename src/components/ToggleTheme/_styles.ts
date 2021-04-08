import styled from 'styled-components';

const ToggleThemeContainer = styled.span`
  display: flex;
  justify-content: flex-end;

  button {
    padding: 0;
    border: none;
    background-color: transparent;

    svg {
      transform: scale(0.75);
    }
  }
`;

export default ToggleThemeContainer;
