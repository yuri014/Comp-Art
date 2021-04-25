import styled from 'styled-components';

const EditProfileContainer = styled.main`
  display: grid;
  place-items: center;
  margin-top: 2rem;
  padding-bottom: 8rem;
  color: ${({ theme }) => theme.colors.themeColor};

  @media (min-width: 1100px) {
    padding-top: 8rem;
    padding-bottom: 2rem;
    margin: 0 auto;
    width: 50%;
  }
`;

export default EditProfileContainer;
