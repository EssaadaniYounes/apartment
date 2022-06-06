import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export default function UserWrapper({ children }) {
    const [user, setUser] = useState([]);
    const [users, setUsers] = useState([]);
    const [lodgings, setLodgings] = useState([]);
    const [apartments, setApartments] = useState([]);
    const [clients, setClients] = useState([]);
    const [sales, setSales] = useState([]);
    const [payments, setPayments] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    return (
        <UserContext.Provider
            value={{
                user, setUser,
                users, setUsers,
                lodgings, setLodgings,
                apartments, setApartments,
                clients, setClients,
                sales, setSales,
                payments, setPayments,
                notifications, setNotifications,
                showNotifications, setShowNotifications
            }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    return useContext(UserContext);
}