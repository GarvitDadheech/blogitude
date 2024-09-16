import { ReactNode, useState } from "react";
import UserContext from "./UserContext";

interface UserContextProviderProps {
    children: ReactNode;
}
const UserContextProvider = ({children} : UserContextProviderProps) => {
    const [user, setUser] = useState<string | null>(null);
    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider