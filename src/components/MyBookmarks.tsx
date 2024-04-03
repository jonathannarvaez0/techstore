import { useEffect, useState } from "react";
import Modal from "./Modal";
import Card from "./Card";
import FullDetails from "./FullDetails";
import DeleteConfirmation from "./DeleteConfirmation";
import { Endpoint } from "../../credentials/Endpoint";
import { Context } from "./Context";
import { Authorization } from "../../credentials/Auth";
import { ErrorHandling } from "../functions/HttpErrorHandling";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface MyBookmarksProps {
  close: () => void;
}

type Bookmark = {
  id: number;
  itemBookmarkedId: number;
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

function MyBookmarks(props: MyBookmarksProps) {
  let context = Context();

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [selectedBookmark, setSelectedBookmark] = useState<Bookmark>({
    id: 0,
    itemBookmarkedId: 0,
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

  const [bookmarkIdForDeletion, setBookmarkIdForDeletion] = useState<number>(0);

  useEffect(() => {
    FetchBookmarks();
  }, []);

  const FetchBookmarks = async () => {
    try {
      let res = await fetch(
        `${Endpoint}/product/bookmark/all/${context.userDetails.id}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: Authorization,
          },
        }
      );
      let response = await res.json();
      if (ErrorHandling(response)) {
        let copyofresponse: Bookmark[] = JSON.parse(JSON.stringify(bookmarks));
        copyofresponse = [];
        response.forEach((element: any) => {
          copyofresponse.push({
            id: element.id,
            itemBookmarkedId: element.itemBookmarkedId,
            productName: element.product.productName,
            price: element.product.productName,
            location: element.product.location,
            datePosted: element.product.datePosted,
            details: element.product.details,
            categoryId: element.product.categoryId,
            categoryName: element.product.categoryName,
            conditionId: element.product.conditionId,
            conditionName: element.product.conditionName,
            warrantyId: element.product.warrantyId,
            warrantyName: element.product.warrantyName,
            sellerId: element.product.sellerId,
            sellerUsername: element.product.sellerUsername,
            sellerEmail: element.product.sellerEmail,
            sellerContact: element.product.sellerContact,
          });
        });
        setBookmarks(copyofresponse);
      }
    } catch (error) {
      alert(error);
    }
  };

  const DeleteBookmark = async () => {
    try {
      await fetch(
        `${Endpoint}/product/bookmark/delete/${bookmarkIdForDeletion}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `${Authorization}`,
          },
        }
      );
      FetchBookmarks();
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
        <h1>My Bookmarks</h1>
        {bookmarks?.map((element, index: number) => {
          return (
            <Card
              key={index}
              element={element}
              index={index}
              setSelectedProduct={(element) => setSelectedBookmark(element)}
              setIsProductFullDetailsVisible={(condition) =>
                setIsProductFullDetailsVisible(condition)
              }
            >
              <div className="absolute right-1 top-1 flex gap-2 items-center">
                <span
                  className="text-xs text-main hover:cursor-pointer"
                  onClick={() => {
                    setBookmarkIdForDeletion(element.id);
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
          product={selectedBookmark}
        ></FullDetails>
      )}
      {isDeleteConfirmationVisible && (
        <DeleteConfirmation
          close={() => setIsDeleteConfirmationVisible(false)}
          deleteHandler={DeleteBookmark}
        ></DeleteConfirmation>
      )}
    </Modal>
  );
}
export default MyBookmarks;
