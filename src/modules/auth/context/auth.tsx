 
import { createContext, useState } from "react";

import { saveState } from "../../../utils/localStorage";
import { ContextProps, IUser, UserContextType } from "../types";

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
