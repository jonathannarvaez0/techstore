import { DisplayTextWithLineBreak } from "../functions/LineBreak";
import Modal from "./Modal";

interface FullDetailsProps {
  product: {
    id: number;
    productName: string;
    price: string;
    details: string;
    location: string;
    datePosted: string;
    categoryId: number;
    categoryName: string;
    conditionId: number;
    conditionName: string;
    warrantyId: number;
    warrantyName: string;
    sellerId: number;
    sellerUsername: string;
    sellerEmail: string;
    sellerContact: string;
  };
  close: () => void;
}

function FullDetails(props: FullDetailsProps) {
  return (
    <Modal onClick={props.close}>
      <div
        className="bg-white p-5 rounded w-90 max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-main p-3 ">
          <h3 className="text-white font-semibold">Items Details</h3>
        </div>
        <div className="border border-slate-300 p-2">
          <h1 className="text-accent font-bold">{props.product.productName}</h1>
          <p className="text-green-600 font-semibold">
            PHP {props.product.price}
          </p>
          <p>
            <span className="text-green-600">
              {props.product.conditionName}
            </span>
            <span> with </span>
            <span className="text-green-600">{props.product.warrantyName}</span>
          </p>
          <p>
            Posted by{" "}
            <span className="text-accent font-bold">
              {props.product.sellerUsername}
            </span>{" "}
            on <span>{props.product.datePosted}</span>
          </p>
          <p>
            Location:{" "}
            <span className="text-amber-900 font-bold">
              {props.product.location}
            </span>{" "}
            Contact Number:{" "}
            <span className="text-amber-900 font-bold">
              {props.product.sellerContact}
            </span>
          </p>
          <div>{DisplayTextWithLineBreak(props.product.details)}</div>
        </div>
      </div>
    </Modal>
  );
}

export default FullDetails;
