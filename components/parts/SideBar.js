import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { useUserContext } from '../../context/user';
import { useOnClickOutside } from '../../hooks/click-outside';


const classes = {
    links: 'w-full flex flex-col items-start justify-start mt-6 text-sm font-semibold',
    icon: 'h-6 w-6 ',
    link: 'w-full flex gap-2 ml-4 justify-center text-black md:justify-start justify-center items-center my-3 duration-200 hover:text-gray-500',
    span: 'w-[60%]'
}

const SideBar = () => {

    const { user, showSideBar, setShowSideBar } = useUserContext();

    const permissions = user != null ? user.roles.permissions : null;

    return (
        <div className={`not-print bg-white text-[#c2c7d0] h-screen fixed overflow-hidden top-0 pt-1 shadow-xl duration-200 z-10 ${showSideBar ? 'w-0' : 'w-[160px] md:w-[220px]'} `}>
            <div className="w-full h-[50px] flex items-center flex-row-reverse justify-between gap-2">
                <span className="flex-1 text-black text-[15px] font-semibold hidden md:block">
                    Group Nhaila</span>
                <img src={'/images/logo.png'} className='w-[100px] h-[55px] mx-auto md:w-[60px]' />
            </div>
            <div className={classes.links}>
                {
                    permissions?.dashboard && <Link href='/admin'>
                        <a className={classes.link}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={classes.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span className={classes.span}>
                                Dashboard
                            </span>
                        </a>
                    </Link>
                }
                {
                    permissions?.projets && <Link href='/admin/lodgings'>
                        <a className={classes.link}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={classes.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                            </svg>
                            <span className={classes.span}>
                                Projet
                            </span>
                        </a>
                    </Link>}
                {/* {
                    permissions?.propriéte && <Link href='/admin/apartments'>
                        <a className={classes.link}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={classes.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className={classes.span}>
                                Propriété
                            </span>
                        </a>
                    </Link>
                } */}
                {
                    permissions?.clients &&
                    <Link href='/admin/clients'>
                        <a className={classes.link}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={classes.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className={classes.span}>
                                Clients
                            </span>
                        </a>
                    </Link>
                }
                {/* {
                    permissions?.ventes &&
                    <Link href='/admin/sales'>
                        <a className={classes.link}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={classes.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className={classes.span}>
                                Ventes
                            </span>
                        </a>
                    </Link>}
                {
                    permissions?.paiments &&
                    <Link href='/admin/sales/sale/payments/'>
                        <a className={classes.link}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={classes.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            <span className={classes.span}>
                                Payments
                            </span>
                        </a>
                    </Link>} */}
                {
                    permissions?.roles && <Link href='/admin/roles/add'>
                        <a className={classes.link}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={classes.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                            <span className={classes.span}>
                                Roles
                            </span>
                        </a>
                    </Link>
                }
                {
                    permissions?.utilisateurs &&
                    <Link href='/admin/users'>
                        <a className={classes.link}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={classes.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span className={classes.span}>
                                Utilisateurs
                            </span>
                        </a>
                    </Link>}
            </div>
        </div>
    );
};

export default SideBar;