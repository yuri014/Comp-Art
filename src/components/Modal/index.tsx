import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import ModalContainer from './styles';

interface ModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
}

const Modal: React.FC<ModalProps> = props => (
  <ModalContainer>
    <div className={`modal-block-${props.show}`}>
      <div className="modal-content">
        <div className="modal-title">
          <p>{props.title}</p>
        </div>
        <button type="button" onClick={props.onHide} className="close-modal">
          <FaTimesCircle />
        </button>
        <hr />
        {props.show && props.children}
      </div>
    </div>
  </ModalContainer>
);

export default Modal;
