import React, { createContext } from 'react';
import Modal from '@components/Modal';

interface ModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  text?: string | React.ReactNode;
  fontSize?: string;
}

export const ModalContext = createContext<ModalProps>(null);

export const ModalProvider: React.FC<ModalProps> = ({
  onHide,
  show,
  title,
  children,
  fontSize,
  text,
}) => (
  <ModalContext.Provider
    value={{
      onHide,
      text,
      show,
      title,
      fontSize,
    }}
  >
    <Modal>{children}</Modal>
  </ModalContext.Provider>
);

export default ModalContext;
