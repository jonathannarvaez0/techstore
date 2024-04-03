import { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { Context } from "./components/Context";
import Signup from "./components/Signup";
import AddListing from "./components/AddOrEditListing";
import FullDetails from "./components/FullDetails";
import { Authorization } from "../credentials/Auth";
import LogoutConfirmation from "./components/LogoutConfirmation";
import Card from "./components/Card";
import MyItems from "./components/MyItems";
import { Endpoint } from "../credentials/Endpoint";
import { ErrorHandling } from "./functions/HttpErrorHandling";

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

type Categories = [
  {
    id: number;
    categoryName: string;
  }
];

function App() {
  let context = Context();

  const [isLoginVisible, setIsLoginVisible] = useState<boolean>(false);
  const [isSignupVisible, setIsSignupVisible] = useState<boolean>(false);
  const [isAddListingVisible, setIsAddListingVisible] =
    useState<boolean>(false);
  const [isProductFullDetailsVisible, setIsProductFullDetailsVisible] =
    useState<boolean>(false);
  const [isLogoutConfirmationVisible, setIsLogoutConfirmationVisible] =
    useState<boolean>(false);
  const [isMyItemsVisible, setIsMyItemsVisible] = useState<boolean>(false);

  const [products, setProducts] = useState<Product[]>();

  const [categories, setCategories] = useState<Categories>([
    {
      id: 0,
      categoryName: "All",
    },
  ]);

  const [filterCondition, setFilterCondition] = useState<number>(0);

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

  useEffect(() => {
    FetchProducts();
    FetchCategories();
  }, []);

  const FetchProducts = async () => {
    try {
      let res = await fetch(`${Endpoint}/product/all`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `${Authorization}`,
        },
      });
      let response = await res.json();
      if (ErrorHandling(response)) setProducts(response);
    } catch (error) {
      alert(error);
    }
  };

  const FetchCategories = async () => {
    try {
      let res = await fetch(`${Endpoint}/product/category`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      let response = await res.json();
      if (ErrorHandling(response)) {
        let copyofcategories = JSON.parse(JSON.stringify(categories));
        response.forEach((element: Categories) => {
          copyofcategories.push(element);
        });
        setCategories(copyofcategories);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <main className="bg-main min-h-svh">
        <div className="w-90 max-w-screen-xl m-auto">
          <header className="">
            <nav className="text-white flex justify-between p-5">
              <h1 className="font-bold text-4xl">{":)"}</h1>
              <ul className="flex items-center gap-5 ">
                {context.isLoggedIn ? (
                  <>
                    <li className="font-bold text-lg">
                      {"Hi "}
                      {context.userDetails.firstname}
                      {"!"}
                    </li>
                    <li
                      className="font-bold text-lg border-accent hover:border-b-4 hover:cursor-pointer transition-all"
                      onClick={() => setIsLogoutConfirmationVisible(true)}
                    >
                      Logout
                    </li>
                  </>
                ) : (
                  <>
                    <li
                      className="font-bold text-lg border-accent hover:border-b-4 hover:cursor-pointer transition-all"
                      onClick={() => setIsLoginVisible(true)}
                    >
                      Login
                    </li>
                    <li
                      className="font-bold text-lg border-accent hover:border-b-4 hover:cursor-pointer transition-all"
                      onClick={() => setIsSignupVisible(true)}
                    >
                      Signup
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </header>
          <section className="bg-white rounded p-5 flex flex-col gap-2 min-h-lvh">
            <div className="bg-main p-3 flex justify-between">
              <h3 className="text-white font-semibold">New Items For Sale</h3>
              {context.isLoggedIn && (
                <div className="flex gap-2">
                  <p
                    className="text-accent font-semibold hover:cursor-pointer border-main border-b-2 hover:border-white"
                    onClick={() => {
                      setIsMyItemsVisible(true);
                    }}
                  >
                    My Items
                  </p>
                  <p
                    className="text-accent font-semibold hover:cursor-pointer border-main border-b-2 hover:border-white"
                    onClick={() => {
                      setIsAddListingVisible(true);
                    }}
                  >
                    Sell
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <select
                className="w-56 border border-slate-300 outline-none"
                onChange={(e) => setFilterCondition(parseInt(e.target.value))}
              >
                {categories.map((element, index) => {
                  return (
                    <option key={index} value={element.id}>
                      {element.categoryName}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="border border-slate-300 p-2">
              <div>
                {products
                  ?.filter((elem) =>
                    filterCondition == 0
                      ? true
                      : elem.categoryId === filterCondition
                  )
                  .map((element, index) => {
                    return (
                      <Card
                        key={index}
                        element={element}
                        index={index}
                        setSelectedProduct={(element) =>
                          setSelectedProduct(element)
                        }
                        setIsProductFullDetailsVisible={(condition) =>
                          setIsProductFullDetailsVisible(condition)
                        }
                      ></Card>
                    );
                  })}
              </div>
            </div>
          </section>
        </div>
      </main>
      {isLoginVisible && <Login close={() => setIsLoginVisible(false)}></Login>}
      {isSignupVisible && (
        <Signup close={() => setIsSignupVisible(false)}></Signup>
      )}
      {isAddListingVisible && (
        <AddListing
          close={() => setIsAddListingVisible(false)}
          refresh={FetchProducts}
        ></AddListing>
      )}
      {isProductFullDetailsVisible && (
        <FullDetails
          close={() => setIsProductFullDetailsVisible(false)}
          product={selectedProduct}
        ></FullDetails>
      )}
      {isLogoutConfirmationVisible && (
        <LogoutConfirmation
          close={() => setIsLogoutConfirmationVisible(false)}
        ></LogoutConfirmation>
      )}
      {isMyItemsVisible && (
        <MyItems
          close={() => setIsMyItemsVisible(false)}
          myItems={products?.filter(
            (element) => element.sellerId === context.userDetails.id
          )}
          refresh={FetchProducts}
        ></MyItems>
      )}
    </>
  );
}

export default App;
