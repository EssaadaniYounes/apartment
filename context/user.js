import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export default function UserWrapper({ children }) {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [lodgings, setLodgings] = useState([]);
    const [apartments, setApartments] = useState([]);
    const [clients, setClients] = useState([]);
    const [sales, setSales] = useState([]);
    const [payments, setPayments] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showSideBar, setShowSideBar] = useState(true);
    const [projectPaymentItems, setProjectPaymentItems] = useState([]);
    const [projectPayments, setProjectPayments] = useState([]);
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
                showNotifications, setShowNotifications,
                showSideBar, setShowSideBar,
                projectPaymentItems, setProjectPaymentItems,
                projectPayments, setProjectPayments
            }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    return useContext(UserContext);
}