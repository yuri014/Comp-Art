import React, { useEffect, useState } from 'react';
import { QrCodePix } from 'qrcode-pix';

import { IPixInput } from '@interfaces/Profile';
import { ModalProvider } from '@context/modal';
import { RenderPixQrCodeContainer } from './styles';

interface RenderPixQrCodeProps {
  name: string;
  pix: IPixInput | null;
}

const RenderPixQrCode: React.FC<RenderPixQrCodeProps> = ({ pix, name }) => {
  const [qrCode, setQCode] = useState('');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (pix.key) {
      QrCodePix({
        version: '01',
        name,
        ...pix,
      })
        .base64()
        .then(img => setQCode(img));
    }
  }, [name, pix]);

  if (!pix.key) {
    return <></>;
  }

  return (
    <>
      <button
        className="donate"
        type="button"
        onClick={() => setOpenModal(true)}
      >
        DOAR
      </button>
      {openModal && (
        <ModalProvider
          onHide={() => setOpenModal(false)}
          title={`Contribua com ${name}`}
          text={
            <p>
              Aponte seu leitor de QR Code e contribua com a arte de {name}.
            </p>
          }
        >
          <RenderPixQrCodeContainer>
            <img src={qrCode} alt="QR Code" width="300px" height="300px" />
          </RenderPixQrCodeContainer>
        </ModalProvider>
      )}
    </>
  );
};

export default RenderPixQrCode;
