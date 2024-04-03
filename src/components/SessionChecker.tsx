import { useEffect } from "react";
import { CheckSessionIfExisting, GetSessionValue } from "../functions/Session";
import { Authorization } from "../../credentials/Auth";
import { Context } from "./Context";
import { Endpoint } from "../../credentials/Endpoint";

interface SessionCheckerProps {
  children: React.ReactNode;
}

export function SessionChecker(props: SessionCheckerProps) {
  let context = Context();

  useEffect(() => {
    if (CheckSessionIfExisting()) {
      LoginUsingSession(GetSessionValue());
    }
  }, []);

  const LoginUsingSession = async (data: string | null) => {
    try {
      const res = await fetch(`${Endpoint}/user/relogin`, {
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
      context.SetUserDetailsHandler(response);
    } catch (error) {
      alert(error);
    }
  };

  return <>{props.children}</>;
}
