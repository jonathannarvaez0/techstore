import { ReactNode, createContext, useContext, useState } from "react";
import { RemoveSession, StoreSession } from "../functions/Session";

const AppContext = createContext({
  userDetails: {
    id: 0,
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
  },
  SetUserDetailsHandler: (_details: any) => {},
  isLoggedIn: false,
  LogoutHandler: () => {},
});

interface ProviderPropTypes {
  children: ReactNode;
}

type UserDetails = {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  contact: string;
};

export const Provider = (props: ProviderPropTypes) => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    id: 0,
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const SetUserDetailsHandler = (details: any) => {
    setIsLoggedIn(true);
    let copyofuserdetails = JSON.parse(JSON.stringify(userDetails));

    copyofuserdetails.id = details.id;
    copyofuserdetails.username = details.username;
    copyofuserdetails.firstname = details.firstname;
    copyofuserdetails.lastname = details.lastname;
    copyofuserdetails.email = details.email;
    copyofuserdetails.contact = details.contact;

    StoreSession(details.sessionId);
    setUserDetails(copyofuserdetails);
  };

  const LogoutHandler = () => {
    setIsLoggedIn(false);
    setUserDetails({
      id: 0,
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      contact: "",
    });
    RemoveSession();
  };

  return (
    <AppContext.Provider
      value={{
        userDetails: userDetails,
        SetUserDetailsHandler: SetUserDetailsHandler,
        isLoggedIn: isLoggedIn,
        LogoutHandler: LogoutHandler,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export function Context() {
  return useContext(AppContext);
}
