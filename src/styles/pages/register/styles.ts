import styled from 'styled-components';

const SingUpContainer = styled.div`
  .form-character {
    display: none;
  }

  .form-image svg {
    width: 35rem;
    height: 40rem;
    display: flex;
    margin: auto;
    margin-top: -5rem;
  }

  .selection-buttons {
    width: 80%;
    font-size: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: auto;
    filter: drop-shadow(1px 1px 2px ${props => props.theme.colors.mainColor});
  }

  .arrow-selection {
    cursor: pointer;
    color: white;
    transition: color 0.6s ease-in-out;
  }

  .arrow-selection:hover {
    color: ${props => props.theme.colors.mainColor};
  }

  .forms {
    padding: 1rem;
  }

  .form-start-button {
    width: 18rem;
    height: 4.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    border: none;
    font: 400 16px ${props => props.theme.fonts.display}, sans-serif;
    background-color: ${props => props.theme.colors.mainColor};
    border-radius: 4px;
    color: ${props => props.theme.colors.namesakeText};
    letter-spacing: 2px;
    transition: filter 1s ease, color 1s ease;
    cursor: pointer;
  }

  @media (min-width: 992px) {
    .form-content {
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-template-areas:
        'character form form'
        'character form form';
    }

    .character-selection {
      grid-area: 'character';
      margin-left: 10%;
    }

    .form-character {
      background-color: ${props => props.theme.colors.secondaryBackgroundColor};
      padding: 2.8rem;
      border-radius: 8px;
      grid-area: form;
      display: block;
      margin: auto;
      width: 70%;
      margin-top: 13vh;
      box-shadow: 1px 1px 4px rgba(3, 4, 71, 0.6);
    }

    .form-character-title {
      font: 20px ${props => props.theme.fonts.primary}, sans-serif;
      padding: 2px 7px;
      text-shadow: 2px 2px 2px #030447d3;
      letter-spacing: 1px;
      color: white;
    }

    .form-start-button {
      display: none;
      width: 65%;
    }

    .form-start-button:hover {
      color: rgba(3, 4, 71, 0.8);
      filter: drop-shadow(1px 1px 4px ${props => props.theme.colors.mainColor});
    }

    .desktop {
      display: flex;
    }
  }
`;

export default SingUpContainer;
