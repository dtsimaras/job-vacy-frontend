import { createContext, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

const JwtContext = createContext();

export const JwtProvider = ({ children }) => {
  const [jwt, setJwt] = useLocalStorage("jwtToken", "");
  return (
    <JwtContext.Provider value={{ jwt, setJwt }}>
      {children}
    </JwtContext.Provider>
  );
};

export default JwtContext;
