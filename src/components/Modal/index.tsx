import React, { useRef } from 'react';
import { CgClose } from 'react-icons/cg';
import useOutsideClick from '../../hooks/outsideClick';
import ModalContainer from './styles';

interface ModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  text?: string | React.ReactNode;
  fontSize?: string;
}

const Modal: React.FC<ModalProps> = props => {
  const ref = useRef(null);
  useOutsideClick(ref, props.onHide);

  return (
    <ModalContainer
      fontSize={props.fontSize}
      className={`modal-block-${props.show} prevent-redirect-post`}
    >
      <div className="modal" ref={ref}>
        <button type="button" onClick={props.onHide} className="close-modal">
          <CgClose />
        </button>
        <div className="modal-content">
          <div className="modal-title">
            <p>{props.title}</p>
          </div>
          {props.text && <div className="modal-body">{props.text}</div>}
          {props.children}
        </div>
      </div>
    </ModalContainer>
  );
};

export default Modal;
