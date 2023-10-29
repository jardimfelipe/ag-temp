/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";
import { ContextProps, IUser, UserContextType } from "../types";
import { saveState } from "../../../utils/localStorage";

export const AuthContext = createContext<UserContextType | string>("");

const AuthProvider = ({ children }: ContextProps) => {
  const [user, setUser] = useState<IUser | null>(null);

  const insertUser = (user: IUser | null) => {
    setUser(user);
    saveState("user", user);
  };
  return (
    <AuthContext.Provider value={{ user, insertUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
