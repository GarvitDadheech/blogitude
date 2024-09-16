import { createContext } from "react";
type UserContextType = {
    user: string | null;
    setUser: (user: string) => void;
};
  
const UserContext = createContext<UserContextType | undefined>(undefined);


export default UserContext;