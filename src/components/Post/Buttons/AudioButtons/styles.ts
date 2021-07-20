import styled from 'styled-components';

const AudioButtonsStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 1rem;

  .audio-buttons {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    transform: scale(1.1);

    .secondary-button {
      filter: brightness(0.4);
    }
  }
`;

export default AudioButtonsStyles;
