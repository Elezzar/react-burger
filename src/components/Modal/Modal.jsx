import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { CloseIcon  } from '@ya.praktikum/react-developer-burger-ui-components'

import modalStyle from './Modal.module.css'
import ModalOverlay from "../ModalOverlay/ModalOverlay.jsx";

const modal = document.querySelector('#modal')

const Modal = ({children, closePopup}) => {

  React.useEffect(() => {
    const closePopupOnEsc = (evt) => {
      if(evt.key === 'Escape') {
        closePopup()
      }
    }

    document.addEventListener('keydown', closePopupOnEsc)

    return () => {
      document.removeEventListener('keydown', closePopupOnEsc)
    }
  }, [closePopup])

  return createPortal( 
    <ModalOverlay closePopup={closePopup}>
      <div className={modalStyle.window} onClick={e => e.stopPropagation()}>
        <button className={modalStyle.close} onClick={closePopup}>
          <CloseIcon type="primary"/>
        </button>
        {children}
      </div>
    </ModalOverlay>,
    modal  
    );
  }

  Modal.propTypes = {
    closePopup: PropTypes.func.isRequired
  }

export default Modal;