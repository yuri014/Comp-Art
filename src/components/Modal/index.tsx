import React, { useContext, useEffect, useRef } from 'react';
import { CgClose } from 'react-icons/cg';

import ClientOnlyPortal from '@components/ClientOnlyPortal';
import ModalContext from '@context/modal';
import useOutsideClick from '@hooks/outsideClick';
import ModalContainer from './styles';

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const modalData = useContext(ModalContext);
  const ref = useRef(null);
  useOutsideClick(ref, modalData.onHide);

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        modalData.onHide();
      }
    };

    window.addEventListener('keydown', e => close(e));
    return () => window.removeEventListener('keydown', e => close(e));
  }, [modalData]);

  return (
    <ClientOnlyPortal selector="#modal">
      <ModalContainer
        fontSize={modalData.fontSize}
        className="modal-block-true prevent-redirect-post"
      >
        <div className="modal" ref={ref}>
          <button
            type="button"
            onClick={modalData.onHide}
            className="close-modal"
          >
            <CgClose />
          </button>
          <div className="modal-content">
            <div className="modal-title">
              <p>{modalData.title}</p>
            </div>
            {modalData.text && (
              <div className="modal-body">{modalData.text}</div>
            )}
            {children}
          </div>
        </div>
      </ModalContainer>
    </ClientOnlyPortal>
  );
};

export default React.memo(Modal);
