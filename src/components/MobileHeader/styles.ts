import styled from 'styled-components';

const size = '24px';

const MobileHeaderContainer = styled.header`
  position: absolute;
  top: 0;
  font-size: ${size};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.secondaryBackgroundColor};
  padding: 1rem 2rem;

  h1 {
    font: 400 16px ${props => props.theme.fonts.display}, sans-serif;
    filter: blur(0.4px);
    letter-spacing: 4px;
    color: #ffffff;
    text-shadow: 3px 3px 2px ${props => props.theme.colors.titleColor};
  }
  .profile {
    img {
      height: ${size};
      width: ${size};
      border-radius: 50%;
      object-fit: cover;
    }
  }

  a {
    size: ${size};
    color: ${props => props.theme.colors.mainColor};
  }

  @media (min-width: 1100px) {
    display: none;
  }
`;

export default MobileHeaderContainer;
