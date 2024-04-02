import { ReactNode, useEffect } from "react";

interface ModalProps {
  children: ReactNode;
  onClick: () => void;
}

function Modal(props: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <div
      className="h-screen fixed bg-modal top-0 w-full flex justify-center items-center"
      onClick={(e) => {
        props.onClick();
        e.stopPropagation();
      }}
    >
      {props.children}
    </div>
  );
}

export default Modal;
