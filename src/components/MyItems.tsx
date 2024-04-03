import { useState } from "react";
import Modal from "./Modal";
import Card from "./Card";
import FullDetails from "./FullDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Authorization } from "../../credentials/Auth";
import DeleteConfirmation from "./DeleteConfirmation";
import AddListing from "./AddOrEditListing";
import { Endpoint } from "../../credentials/Endpoint";

interface MyItemsProps {
  close: () => void;
  myItems: Product[] | undefined;
  refresh: () => void;
}

type Product = {
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

function MyItems(props: MyItemsProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product>({
    id: 0,
    productName: " ",
    price: "",
    details: " ",
    location: "",
    datePosted: "",
    categoryId: 0,
    categoryName: "",
    conditionId: 1,
    conditionName: "",
    warrantyId: 1,
    warrantyName: "",
    sellerId: 0,
    sellerUsername: "",
    sellerEmail: "",
    sellerContact: "",
  });
  const [isProductFullDetailsVisible, setIsProductFullDetailsVisible] =
    useState<boolean>(false);

  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState<boolean>(false);

  const [isEditListingVisible, setIsEditListingVisible] =
    useState<boolean>(false);

  const [productIdForDeletion, setProductIdForDeletion] = useState<number>(0);

  const [productToEdit, setProductToEdit] = useState<Product>();

  const DeleteProduct = async () => {
    try {
      await fetch(`${Endpoint}/product/delete/${productIdForDeletion}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `${Authorization}`,
        },
      });
      props.refresh();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Modal onClick={props.close}>
      <div
        className="bg-white p-5 rounded w-90 max-w-xxl"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>My Items</h1>
        {props.myItems?.map((element: Product, index: number) => {
          return (
            <Card
              key={index}
              element={element}
              index={index}
              setSelectedProduct={(element) => setSelectedProduct(element)}
              setIsProductFullDetailsVisible={(condition) =>
                setIsProductFullDetailsVisible(condition)
              }
            >
              <div className="absolute right-1 top-1 flex gap-2 items-center">
                <span
                  className="text-xs text-main hover:cursor-pointer"
                  onClick={() => {
                    setProductToEdit(element);
                    setIsEditListingVisible(true);
                  }}
                >
                  <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                </span>
                <span
                  className="text-xs text-main hover:cursor-pointer"
                  onClick={() => {
                    setProductIdForDeletion(element.id);
                    setIsDeleteConfirmationVisible(true);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {isProductFullDetailsVisible && (
        <FullDetails
          close={() => setIsProductFullDetailsVisible(false)}
          product={selectedProduct}
        ></FullDetails>
      )}
      {isDeleteConfirmationVisible && (
        <DeleteConfirmation
          close={() => setIsDeleteConfirmationVisible(false)}
          deleteHandler={DeleteProduct}
        ></DeleteConfirmation>
      )}
      {isEditListingVisible && (
        <AddListing
          close={() => setIsEditListingVisible(false)}
          refresh={props.refresh}
          productToEdit={productToEdit}
        ></AddListing>
      )}
    </Modal>
  );
}

export default MyItems;
