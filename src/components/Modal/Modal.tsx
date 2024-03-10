import { useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import { CloseIcon  } from '@ya.praktikum/react-developer-burger-ui-components'

import modalStyle from './Modal.module.css'
import ModalOverlay from "../ModalOverlay/ModalOverlay.tsx";

const modal: HTMLElement | null = document.querySelector('#modal')

const Modal = ({children, closePopup} : { children: ReactNode, closePopup: () => void }) => {

  useEffect(() => {
    const closePopupOnEsc = (evt: KeyboardEvent) => {
      if(evt.key === 'Escape') {
        closePopup()
      }
    }

    document.addEventListener('keydown', closePopupOnEsc)

    return () => {
      document.removeEventListener('keydown', closePopupOnEsc)
    }
  }, [closePopup])

  if (!modal) return null;

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

export default Modal;