import React, { useState } from 'react'
import fetch from '../../helpers/fetch-data'
function Notification({ notification }) {

    const [isSeen, setIsSeen] = useState(notification.seen);
    const sendEmail = async () => {
        console.log(isSeen)
        if (isSeen == 0) {
            const res = await fetch('send-mail', 'POST', { notification: notification }, localStorage.getItem('token'));
            console.log(res);
            setIsSeen(1);
        }
    }

    return (
        <div onClick={() => sendEmail()} className={`duration-150 p-2 border-b border-gray-400 ${isSeen == 0 ? 'bg-slate-200' : 'bg-white'} cursor-pointer`}>
            <h4 className='font-bold flex gap-2 text-[13px]'>{notification.next_payment} |
                <span className='capitalize flex items-center '>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {notification.name}
                </span>
            </h4>
            <p></p>
            <p className="text-ellipsis">
                doit payer <span className="font-semibold">{notification.rest} DH </span>
                , propertié <span className="font-semibold">{notification.type} </span>
                à <span className="font-semibold">{notification.city} </span>,
                Projet <span className="font-semibold">{notification.lodging} </span>
            </p>
        </div>
    )
}

export default Notification