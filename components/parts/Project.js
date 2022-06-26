import React, { useEffect, useRef, useState } from 'react'
import fetch from '../../helpers/fetch-data';
import { useUserContext } from '../../context/user';
import AddLodging from './AddLodging';
import { can } from '../../helpers/can';
import Link from 'next/link';
import ProjectProfile from './ProjectProfile';
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
            <div className='relative bg-blue-100 rounded-md overflow-hidden h-[350px] max-h-[420px] shadow-md'>
                {
                    can(permission, 'read') ?
                        <Link href={`/admin/lodgings/${lodging.id}`}>
                            <a>
                                <ProjectProfile lodging={lodging} />
                            </a>
                        </Link> :
                        <ProjectProfile lodging={lodging} />
                }

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