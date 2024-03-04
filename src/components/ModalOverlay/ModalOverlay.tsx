import modalStyle from './ModalOverlay.module.css'

import { ReactNode } from 'react';

const ModalOverlay = ({children, closePopup}: { children: ReactNode, closePopup: () => void }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    closePopup()
  }

  return ( 
    <div className={modalStyle.modal} onClick={handleClick}>
      {children}
    </div>
  );
}

export default ModalOverlay;