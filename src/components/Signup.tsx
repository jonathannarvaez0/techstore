import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import { useState } from "react";
import { Authorization } from "../../credentials/Auth";
import { Endpoint } from "../../credentials/Endpoint";
import { ErrorHandling } from "../functions/HttpErrorHandling";

interface SignupProps {
  close: () => void;
}

type SignupInput = {
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
  contact: string;
};

function Signup(props: SignupProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>();

  const onSubmit: SubmitHandler<SignupInput> = async (data) => {
    try {
      const res = await fetch(`${Endpoint}/user/signup`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: Authorization,
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      if (ErrorHandling(response)) {
        if (typeof ErrorHandling(response) == "string") {
          setErrorMessage(String(ErrorHandling(response)));
        } else {
          setErrorMessage("");
          props.close();
          alert("You can now login");
        }
      }
    } catch (error) {
      alert();
    }
  };
  return (
    <Modal onClick={props.close}>
      <div
        className="bg-white p-5 rounded w-90 max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <label>Username</label>
              <input
                type="text"
                className="border border-slate-900 outline-none rounded"
                {...register("username", {
                  required: "Username can't be blank",
                })}
              ></input>
              <p className="text-red-600 text-sm">{errors.username?.message}</p>
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input
                type="password"
                className="border border border-slate-900 outline-none rounded"
                {...register("password", {
                  required: "Password can't be blank",
                })}
              ></input>
              <p className="text-red-600 text-sm">{errors.password?.message}</p>
            </div>
            <div className="flex flex-col">
              <label>First Name</label>
              <input
                type="text"
                className="border border border-slate-900 outline-none rounded"
                {...register("firstname", {
                  required: "First name can't be blank",
                })}
              ></input>
              <p className="text-red-600 text-sm">
                {errors.firstname?.message}
              </p>
            </div>
            <div className="flex flex-col">
              <label>Last Name</label>
              <input
                type="text"
                className="border border border-slate-900 outline-none rounded"
                {...register("lastname", {
                  required: "Last name can't be blank",
                })}
              ></input>
              <p className="text-red-600 text-sm">{errors.lastname?.message}</p>
            </div>
            <div className="flex flex-col">
              <label>Email</label>
              <input
                type="email"
                className="border border border-slate-900 outline-none rounded"
                {...register("email", { required: "Email can't be blank" })}
              ></input>
              <p className="text-red-600 text-sm">{errors.email?.message}</p>
            </div>
            <div className="flex flex-col">
              <label>Contact</label>
              <input
                type="text"
                className="border border border-slate-900 outline-none rounded"
                {...register("contact", { required: "Contact can't be blank" })}
              ></input>
              <p className="text-red-600 text-sm">{errors.contact?.message}</p>
            </div>
            <p className="text-red-600 text-sm">{errorMessage}</p>
            <div className="">
              <input
                type="submit"
                value={"Sign Up"}
                className="hover:cursor-pointer w-full rounded-2xl bg-accent p-2 text-white font-bold"
              ></input>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default Signup;
