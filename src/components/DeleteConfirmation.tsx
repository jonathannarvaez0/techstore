import Modal from "./Modal";

interface DeleteConfirmationProps {
  close: () => void;
  deleteHandler: () => void;
}

function DeleteConfirmation(props: DeleteConfirmationProps) {
  return (
    <Modal onClick={close}>
      <div
        className="bg-white p-5 rounded w-90 max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Confirmation</h3>
        <p>Are you sure you want to delete?</p>
        <input
          type="submit"
          value={"Logout"}
          className="hover:cursor-pointer w-full rounded-2xl bg-accent p-2 text-white font-bold"
          onClick={() => {
            props.deleteHandler();
            props.close();
          }}
        ></input>
      </div>
    </Modal>
  );
}

export default DeleteConfirmation;
