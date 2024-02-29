import { createContext,useContext,useState } from "react";

const UserContext = createContext(null);

// For Provider Component
export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userInfo, setUserInfo] = useState({});
    return (
        <UserContext.Provider value ={{user, setUser, userInfo, setUserInfo}}>
            {children}
        </UserContext.Provider>
            
    );
}

// For Consumer Components
export function useUserContext() {
    return useContext(UserContext);
}