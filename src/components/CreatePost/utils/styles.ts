import styled from 'styled-components';

const MediaFormContainer = styled.div`
  background: ${({ theme }) => theme.colors.lightSecondaryBackground};
  padding: 2rem 1rem;
  margin-top: 1rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  label {
    margin-top: 0.4rem;
    margin-bottom: 0;

    p {
      margin-bottom: 0.4rem;
    }
  }

  .cleaner {
    cursor: pointer;
    top: 4px;
    right: 4px;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.9);
    color: white;
    border-radius: 50%;
    padding: 0.7rem;
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

  .media {
    position: relative;

    img {
      width: 12rem;
      height: 12rem;
      border-radius: 5px;
    }

    label {
      position: absolute;
      bottom: 0.6rem;
      right: 0.6rem;
      width: auto;
      background: ${({ theme }) => theme.colors.mainColorMedium};
      font-size: 1rem;
      padding: 0.7rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.225s ease-out;
      box-shadow: ${({ theme }) => theme.colors.mainShadow};

      &:focus,
      &:hover {
        border: 2px solid ${({ theme }) => theme.colors.mainColor};
        padding: calc(0.7rem - 2px);
        outline: none;
      }
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 2rem;
    justify-content: space-between;
    align-items: flex-start;

    label {
      width: 34rem;
    }
  }
`;

export default MediaFormContainer;
