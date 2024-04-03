import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import { Authorization } from "../../credentials/Auth";
import { Context } from "./Context";
import {
  AppendLineBreak,
  DisplayTextWithLineBreakForTextArea,
} from "../functions/LineBreak";
import { Endpoint } from "../../credentials/Endpoint";
import { ErrorHandling } from "../functions/HttpErrorHandling";

interface AddOrEditListingProps {
  close: () => void;
  refresh: () => void;
  productToEdit?: AddOrEditProduct;
}

type AddOrEditProduct = {
  id: number;
  productName: string;
  price: string;
  location: string;
  details: string;
  categoryId: number;
  conditionId: number;
  warrantyId: number;
  sellerId: number;
};

type Categories = {
  id: number;
  categoryName: string;
};

type Condition = {
  id: number;
  conditionName: string;
};

type Warranty = {
  id: number;
  warrantyName: string;
};

function AddOrEditListing(props: AddOrEditListingProps) {
  let context = Context();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddOrEditProduct>({
    defaultValues: {
      id: props.productToEdit?.id,
      productName: props.productToEdit?.productName,
      price: props.productToEdit?.price,
      location: props.productToEdit?.location,
      categoryId: props.productToEdit?.categoryId,
      conditionId: props.productToEdit?.conditionId,
      warrantyId: props.productToEdit?.warrantyId,
      details: DisplayTextWithLineBreakForTextArea(
        props.productToEdit?.details
      ),
    },
  });

  const onSubmit: SubmitHandler<AddOrEditProduct> = async (data) => {
    let endpoint = "";
    if (props.productToEdit) endpoint = "/product/modify";
    else endpoint = "product/add";

    try {
      const res = await fetch(`${Endpoint}/product${endpoint}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `${Authorization}`,
        },
        body: JSON.stringify({
          ...data,
          sellerId: context.userDetails.id,
          details: AppendLineBreak(data.details),
          categoryId: data.categoryId,
          conditionId: data.conditionId,
          warrantyId: data.warrantyId,
        }),
      });
      const response = await res.json();
      if (ErrorHandling(response)) {
        props.close();
        props.refresh();
      }
    } catch (error) {
      alert(error);
    }
  };

  const [categories, setCategories] = useState<Categories[]>();

  const [conditions, setConditions] = useState<Condition[]>();

  const [warranties, setWarranties] = useState<Warranty[]>();

  useEffect(() => {
    reset();
  }, [reset, categories, conditions, warranties]);

  useEffect(() => {
    FetchCategories();
    FetchConditions();
    FetchWarranties();
  }, []);

  const FetchCategories = async () => {
    try {
      let res = await fetch(`${Endpoint}/product/category`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: Authorization,
        },
      });
      let response = await res.json();
      if (ErrorHandling(response)) setCategories(response);
    } catch (error) {
      alert(error);
    }
  };

  const FetchConditions = async () => {
    try {
      let res = await fetch(`${Endpoint}/product/condition`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: Authorization,
        },
      });
      let response = await res.json();
      if (ErrorHandling(response)) setConditions(response);
    } catch (error) {
      alert(error);
    }
  };

  const FetchWarranties = async () => {
    try {
      let res = await fetch(`${Endpoint}/product/warranty`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: Authorization,
        },
      });
      let response = await res.json();
      if (ErrorHandling(response)) setWarranties(response);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Modal onClick={props.close}>
      <div
        className="bg-white p-5 rounded w-90 max-w-sm h-5/6 overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Add Product</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <label>Product Name</label>
              <input
                type="text"
                className="border border-slate-400 outline-none rounded"
                {...register("productName", {
                  required: "Product name can't be blank",
                })}
              ></input>
              <p className="text-red-600 text-sm">
                {errors?.productName?.message}
              </p>
            </div>
            <div className="flex flex-col">
              <label>Price</label>
              <input
                defaultValue={0}
                min={0}
                type="number"
                className="border border-slate-400 outline-none rounded"
                {...register("price")}
              ></input>
            </div>

            <div className="flex flex-col">
              <label>Location</label>
              <input
                type="text"
                className="border border-slate-400 outline-none rounded"
                {...register("location", {
                  required: "location name can't be blank",
                })}
              ></input>
              <p className="text-red-600 text-sm">{errors.location?.message}</p>
            </div>

            <div className="flex flex-col">
              <label>Category</label>
              <select
                className="border border-slate-400 outline-none rounded"
                {...register("categoryId", { valueAsNumber: true })}
              >
                {categories?.map((element, index) => {
                  return (
                    <option key={index} value={element.id}>
                      {element.categoryName}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex flex-col">
              <label>Condition</label>
              <select
                className="border border-slate-400 outline-none rounded"
                {...register("conditionId", { valueAsNumber: true })}
              >
                {conditions?.map((element, index) => {
                  return (
                    <option key={index} value={element.id}>
                      {element.conditionName}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex flex-col">
              <label>Warranty</label>
              <select
                className="border border-slate-400 outline-none rounded"
                {...register("warrantyId", { valueAsNumber: true })}
              >
                {warranties?.map((element, index) => {
                  return (
                    <option key={index} value={element.id}>
                      {element.warrantyName}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex flex-col">
              <label>Details</label>
              <textarea
                className="border border-slate-400 outline-none rounded resize-none"
                rows={8}
                {...register("details")}
              ></textarea>
            </div>

            <div className="">
              <input
                type="submit"
                value={props.productToEdit == null ? "Add" : "Edit"}
                className="hover:cursor-pointer w-full rounded-2xl bg-accent p-2 text-white font-bold"
              ></input>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}
export default AddOrEditListing;
