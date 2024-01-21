import React from 'react';

interface ModalMenuProps {
  smallWidth?: boolean;
  closeModal?: (state: boolean) => void;
  children: React.ReactNode
};


const CustomModal: React.FC<ModalMenuProps> = ({children, smallWidth, closeModal}) => {
  const closeModals = () => {
    closeModal && closeModal(false);
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    target.id === 'myModal' && closeModals()
  };


  return (
    <div id="myModal" className={` fixed z-10 py-[50px] left-0 top-0 h-[100%] w-[100%] overflow-y-auto`} onClick={handleOverlayClick}>

      <div className={`modal-content text-black ${smallWidth ? "w-[40vw] " : "w-[70vw] "}  h-fit  rounded-md overflow-y-auto`}>
        {children}         
      </div>
      
    </div>
  );
};

export default  CustomModal;