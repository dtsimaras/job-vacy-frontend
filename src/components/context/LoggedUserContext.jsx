import { createContext, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

const LoggedUserContext = createContext();

export const LoggedUserProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useLocalStorage(
    "loggedUser.attentance",
    false
  );
  return (
    <LoggedUserContext.Provider value={{ setLoggedUser, loggedUser }}>
      {children}
    </LoggedUserContext.Provider>
  );
};
export default LoggedUserContext;
