import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import { useState } from "react";
import { Context } from "./Context";
import { Authorization } from "../../credentials/Auth";

interface LoginProps {
  close: () => void;
}

type LoginInput = {
  username: string;
  password: string;
};

function Login(props: LoginProps) {
  let context = Context();

  const [errorMessage, setErrorMessage] = useState<string>("");

  const { register, handleSubmit } = useForm<LoginInput>();

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {
      const res = await fetch("https://localhost:44308/user/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `${Authorization}`,
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();

      if (response.code == 404 || response.code == 401) {
        setErrorMessage(response.message);
      } else {
        setErrorMessage("");
        context.SetUserDetailsHandler(response);
        props.close();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal onClick={props.close}>
      <div
        className="bg-white p-5 rounded w-90 max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <label>Username</label>
              <input
                type="text"
                className="border border-slate-900 outline-none rounded"
                {...register("username")}
              ></input>
            </div>
            <div className="flex flex-col">
              <label>Password</label>
              <input
                type="password"
                className="border border border-slate-900 outline-none rounded"
                {...register("password")}
              ></input>
            </div>
            <p className="text-red-600 text-sm">{errorMessage}</p>
            <div className="">
              <input
                type="submit"
                value={"Login"}
                className="hover:cursor-pointer w-full rounded-2xl bg-accent p-2 text-white font-bold"
              ></input>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}
export default Login;
