import React, { useEffect, useRef, useState } from 'react'
import fetch from '../../helpers/fetch-data';
import { useUserContext } from '../../context/user';
import { useOnClickOutside } from '../../hooks/click-outside';
import Notification from './Notification';
function Notifications() {
    const ref = useRef(null);
    const { notifications, setNotifications, showNotifications, setShowNotifications } = useUserContext();
    useOnClickOutside(ref, () => { setShowNotifications(false) })
    useEffect(() => {
        const get = async () => {
            const res = await fetch('payments/payment/notifications', 'get', {}, localStorage.getItem('token'));
            setNotifications(res.data);
        }
        get();
    }, [])

    return (
        (notifications.length > 0 && showNotifications) &&
        <div ref={ref} className="not-print flex flex-col w-[100px] md:w-[400px] shadow-md absolute z-[900] mt-1 mr-3 right-0 max-h-screen overflow-y-auto">
            {notifications.map((notification, index) => <Notification notification={notification} key={index} />)}
        </div>
    )
}

export default Notifications