import { createContext } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

const ApplicationContext = createContext();

export const Context = ({ children }) => {
  const [jwt, setJwt] = useLocalStorage("jwtToken", "");
  const [loggedUser, setLoggedUser] = useLocalStorage(
    "loggedUser.attentance",
    false
  );
  return (
    <ApplicationContext.Provider
      value={{ jwt, setJwt, loggedUser, setLoggedUser }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContext;
