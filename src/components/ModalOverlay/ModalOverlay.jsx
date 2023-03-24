import modalStyle from './ModalOverlay.module.css'

const ModalOverlay = ({children, closePopup}) => {
  const handleClick = (e) => {
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