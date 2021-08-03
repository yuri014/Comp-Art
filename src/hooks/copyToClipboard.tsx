import React, { useRef, useState } from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import { FaTimes } from 'react-icons/fa';

type UseCopyToClipboard = {
  copyToClipboard: () => void;
  CopyToClipboard: React.FC;
};

const useCopyToClipboard = (value: string): UseCopyToClipboard => {
  const [isClipped, setIsClipped] = useState(false);
  const clip = useRef(null);

  const copyToClipboard = () => {
    clip.current.select();
    document.execCommand('copy');
    setIsClipped(true);
  };

  const CopyToClipboard = () => (
    <>
      <textarea
        ref={clip}
        readOnly
        style={{ position: 'absolute', left: '-999em' }}
        value={value}
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={isClipped}
        autoHideDuration={1000}
        onClose={() => setIsClipped(false)}
        message="Copiado"
        color="error"
        action={
          <IconButton
            size="small"
            aria-label="fechar alerta de mensagem copiada"
            onClick={() => setIsClipped(false)}
            color="primary"
          >
            <FaTimes />
          </IconButton>
        }
      />
    </>
  );

  return { copyToClipboard, CopyToClipboard };
};

export default useCopyToClipboard;
