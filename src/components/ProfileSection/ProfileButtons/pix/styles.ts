import styled from 'styled-components';

export const CreatePixContainer = styled.form`
  padding: 0 2rem;
`;

export const RenderPixQrCodeContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  .copy-button {
    width: 22rem;
    display: inherit;
    align-items: inherit;
    justify-content: inherit;
    gap: 0.4rem;
    margin-top: 2rem;
  }
`;
