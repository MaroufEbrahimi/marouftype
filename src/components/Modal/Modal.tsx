import React from "react";
import "./Modal.css";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="modal_overlay">
      <div className="modal_box">
        {children}
        <button className="modal_btn" onClick={onClose}>
          بستن
        </button>
      </div>
    </div>
  );
};

export default Modal;
