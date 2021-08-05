import React, { useEffect, useState } from 'react';
import { QrCodePix } from 'qrcode-pix';
import { IoCopy } from 'react-icons/io5';

import { IPixInput } from '@interfaces/Profile';
import { ModalProvider } from '@context/modal';
import useCopyToClipboard from '@hooks/copyToClipboard';
import CAButton from '@styles/components/button';
import { RenderPixQrCodeContainer } from './styles';

interface RenderPixQrCodeProps {
  name: string;
  pix: IPixInput;
}

const RenderPixQrCode: React.FC<RenderPixQrCodeProps> = ({ pix, name }) => {
  const [qrCode, setQCode] = useState('');
  const [copyPastePix, setCopyPastePix] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const { CopyToClipboard, copyToClipboard } = useCopyToClipboard(copyPastePix);

  useEffect(() => {
    if (pix && pix.key) {
      const pixCode = QrCodePix({
        version: '01',
        name,
        ...pix,
      });

      setCopyPastePix(pixCode.payload);
      pixCode.base64().then(img => setQCode(img));
    }
  }, [name, pix]);

  if (!pix || !pix.key) {
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
              Aponte seu leitor de QR Code ou copie o código pix e contribua com
              a arte de <span className="primary-icon">{name}</span>.
            </p>
          }
        >
          <RenderPixQrCodeContainer>
            <img src={qrCode} alt="QR Code" width="300px" height="300px" />
            <CAButton
              className="copy-button"
              type="button"
              onClick={copyToClipboard}
            >
              Copiar &quot;Pix Copia e Cola&quot;
              <IoCopy />
            </CAButton>
            <CopyToClipboard />
          </RenderPixQrCodeContainer>
        </ModalProvider>
      )}
    </>
  );
};

export default RenderPixQrCode;
