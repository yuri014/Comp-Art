import React from 'react';
import { CgClose } from 'react-icons/cg';
import ModalContainer from './styles';

interface ModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  text: string;
}

const Modal: React.FC<ModalProps> = props => (
  <ModalContainer className={`modal-block-${props.show}`}>
    <div className="modal">
      <button type="button" onClick={props.onHide} className="close-modal">
        <CgClose />
      </button>
      <div className="modal-content">
        <div className="modal-title">
          <p>{props.title}</p>
        </div>
        <div className="modal-body">
          <p>{props.text}</p>
        </div>
        {props.show && props.children}
      </div>
    </div>
  </ModalContainer>
);

export default Modal;
