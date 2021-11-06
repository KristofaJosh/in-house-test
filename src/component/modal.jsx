import React from 'react';
import ReactDOM from "react-dom";
import styled from "styled-components/macro";

const Portal = ({children}) => ReactDOM.createPortal(children, document.getElementById('root-modal'));

const Modal = ({visible, closeModal, children}) => (
  <Portal>
    {visible && <ModalStyling>
      <div className="modal-content">
        <div className="modal-content--close" onClick={closeModal}><p>Close</p></div>
        {children}
      </div>
    </ModalStyling>}
  </Portal>
);

const ModalStyling = styled.div`
  position: fixed;
  background: #00000040;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-content {
    padding: 10px;
    border-radius: 5px;
    background-color: white;
    &--close {
      width: 100%;
      padding-bottom: 20px;

      > p {
        text-align: right;
        cursor: pointer;
      }
    }
  }
`;

export default Modal;
