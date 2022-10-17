import {useState, createContext, useContext} from "react";
import "./index.css";
import {createPortal} from "react-dom";

const useModal = () => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const handleModal = (content = false) => {
    setModal(!modal);
    if (content) {
      setModalContent(content);
    }
  };
  return {modal, handleModal, modalContent};
};

const ModalContext = createContext();
const ModalProvider = ({children}) => {
  const {modal, handleModal, modalContent} = useModal();
  return (
    <ModalContext.Provider value={{modal, handleModal, modalContent}}>
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};

const Modal = () => {
  let {modalContent, handleModal, modal} = useContext(ModalContext);
  return modal ? createPortal(
    <>
      <div id="overlay" onClick={() => handleModal(null)}>
      </div>
      <div id="modal-container">
        {modalContent}
      </div>
    </>,
    document.getElementById("modal-portal")
  ) : null;
};

export {ModalContext, ModalProvider};
