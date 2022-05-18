import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-nextjs-toast'

import fetch from '../../../helpers/fetch-data';
import { AutoLogin } from '../../../helpers/auto-login';
import { useUserContext } from '../../../context/user';
import { Loader, TablesHeader } from '../../../components/parts';

function index({ lodgings, user }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const { setLodgings, setUser } = useUserContext();
    useEffect(() => {
        if (user) {
            setUser(user);
            setLodgings(lodgings);
        }
    }, []);
    //functions
    const filterLodgings = (value) => {

    }
    return (
        <>
            {isDeleting && <Loader />}
            <div className="px-0 sm:px-8 py-4 shadow-sm w-full relative">
                <div className="absolute z-10 -top-[100px] bg-red-400">
                    <ToastContainer />
                </div>
                <TablesHeader to='/admin/sales/add' title='List de ventes' />
                <div className="relative md:ml-6 mt-8 mx-auto z-0 mb-6 max-w-[80%] md:w-[49%] group">
                    <input type="text"
                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=" "
                        onKeyUp={(e) => { filterLodgings(e.target.value) }} />
                    <label className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Chercher</label>
                </div>
            </div>
            <div className='mx-4 mt-2 items-center gap-y-3 grid gap-x-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    lodgings.map(lodging => {
                        return (
                            <div className=' relative bg-blue-100 rounded-md overflow-hidden h-[310px] max-h-[420px] shadow-sm'>
                                <img src={lodging.image} className='w-full max-h-[60%]' alt="" />
                                <div className='mt-4 px-4'>
                                    <h1 className='font-semibold text-center'>{lodging.name}</h1>
                                    <div className='flex items-center gap-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#33af2e" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {lodging.city}
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#33af2e" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                        </svg>
                                        {lodging.address}
                                    </div>
                                </div>
                                <div className='absolute -bottom-2 w-full bg-blue-50 h-[40px] py-2'>
                                    <div className='flex items-center justify-around'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400 duration-100 hover:text-orange-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 duration-100 hover:text-red-700 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300 duration-100 hover:text-blue-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export async function getServerSideProps(ctx) {
    const res = await fetch('lodgings', 'get', {}, ctx.req.cookies.token);
    const user = await AutoLogin(ctx);
    return {
        props: {
            lodgings: res.data,
            user: user.dataUser
        }
    }
}
export default index