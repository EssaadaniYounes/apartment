import React, { useState } from 'react'
import Image from 'next/image';

import Link from 'next/link';
import fetch from '../../helpers/fetch-data';
import { useUserContext } from '../../context/user';
import AddLodging from './AddLodging';
import Loader from './Loader';
import { can } from '../../helpers/can';
function Project({ lodging, onNotify, setIsLoading }) {
    const { setLodgings, lodgings, user } = useUserContext();
    const permission = user.roles.permissions.projets;
    const [showModal, setShowModal] = useState(false);
    const deleteLodging = async () => {
        if (confirm('Voulez-vous vraiment supprimer ce projet ?')) {
            setIsLoading(true);
            const response = await fetch(`lodgings/${lodging.id}`, 'delete', {}, localStorage.getItem('token'));
            if (response.status == 200) {
                const newLodgings = lodgings.filter(l => l.id != lodging.id)
                setLodgings(newLodgings);
                onNotify();
            }
            setIsLoading(false);
        }
    }

    return (
        <>

            {showModal && <AddLodging setShowModal={setShowModal} lodging={lodging} setIsLoading={setIsLoading} />}
            <div className='relative bg-blue-100 rounded-md overflow-hidden h-[310px] max-h-[420px] shadow-sm'>
                <div className='w-full max-h-[60%] relative h-[200px]' >
                    <Image src={lodging.image} layout='fill' alt="" priority />
                </div>
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
                        {can(permission, 'update') && < span className='cursor-pointer' onClick={() => setShowModal(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400 duration-100 hover:text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </span>}
                        {can(permission, 'delete') && <span className='cursor-pointer' onClick={() => deleteLodging()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 duration-100 hover:text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Project