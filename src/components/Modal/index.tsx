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
          <h2>{props.title}</h2>
        </div>
        <div
          role="button"
          onClick={props.onHide}
          onKeyDown={props.onHide}
          className="close-modal"
          tabIndex={0}
        >
          <FaTimesCircle />
        </div>
        <hr />
        {props.show && props.children}
      </div>
    </div>
  </ModalContainer>
);

export default Modal;
