import { useState } from "react";
import Modal from "./Modal";
import Card from "./Card";
import FullDetails from "./FullDetails";

interface MyItemsProps {
  close: () => void;
  myItems: Product[] | undefined;
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

  return (
    <Modal onClick={props.close}>
      <div
        className="bg-white p-5 rounded w-90 max-w-xxl"
        onClick={(e) => e.stopPropagation()}
      >
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
            ></Card>
          );
        })}
      </div>

      {isProductFullDetailsVisible && (
        <FullDetails
          close={() => setIsProductFullDetailsVisible(false)}
          product={selectedProduct}
        ></FullDetails>
      )}
    </Modal>
  );
}

export default MyItems;
