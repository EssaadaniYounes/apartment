import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export default function UserWrapper({ children }) {
    const [user, setUser] = useState(null);
    const [apartments, setApartments] = useState([]);
    return (
        <UserContext.Provider value={{ user, setUser, apartments, setApartments }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    return useContext(UserContext);
}