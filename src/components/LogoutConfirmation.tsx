import { Context } from "./Context";
import Modal from "./Modal";

interface LogoutConfirmationProps {
  close: () => void;
}

function LogoutConfirmation(props: LogoutConfirmationProps) {
  let context = Context();
  return (
    <Modal onClick={props.close}>
      <div
        className="bg-white p-5 rounded w-90 max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Confirmation</h3>
        <p>Are you sure you want to logout?</p>
        <input
          type="submit"
          value={"Logout"}
          className="hover:cursor-pointer w-full rounded-2xl bg-accent p-2 text-white font-bold"
          onClick={() => {
            context.LogoutHandler();
            props.close();
          }}
        ></input>
      </div>
    </Modal>
  );
}

export default LogoutConfirmation;
