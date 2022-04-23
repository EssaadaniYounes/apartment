import React from 'react';
import Link from 'next/link';
import { useUserContext } from '../../context/user';

function Header() {
    const { user } = useUserContext();
    return (
        <div className="bg-gray-50 shadow-md text-gray-700 h-[60px] w-full z-20 flex items-center px-12 justify-start gap-6 flex-row-reverse">
            <Link href='/auth' >
                <a className="flex items-center gap-1 text-xl font-semibold duration-100 hover:text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className='capitalize'>
                        {user?.name}
                    </span>
                </a>
            </Link>
            <div className='relative cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <div className='absolute bg-red-600 -right-1 top-0 min-w-[20px] text-center rounded-md'>
                    5+
                </div>
            </div>
        </div>
    )
}

export default Header