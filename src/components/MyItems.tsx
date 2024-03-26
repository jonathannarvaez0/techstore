import Modal from "./Modal";

interface MyItemsProps {
  close: () => void;
}

function MyItems(props: MyItemsProps) {
  return (
    <Modal onClick={props.close}>
      <div
        className="bg-white p-5 rounded w-90 max-w-xxl"
        onClick={(e) => e.stopPropagation()}
      ></div>
    </Modal>
  );
}

export default MyItems;
