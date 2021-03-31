import styled from 'styled-components';

const TitleContainer = styled.h1`
  text-align: center;
  font-family: ${props => props.theme.fonts.display};
  font-size: 5rem;
  letter-spacing: 0.2rem;
  text-shadow: 4px 4px 0px ${props => props.theme.colors.titleColor};

  @media (min-width: 992px) {
    font-size: 6rem;
  }
`;

export default TitleContainer;
