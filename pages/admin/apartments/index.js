import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-nextjs-toast'

import { ApartmentsHeader, CustomDataTable, Loader } from '../../../components/parts';

import { useUserContext } from '../../../context/user';
import fetch from '../../../helpers/fetch-data';
import { AutoLogin } from '../../../helpers/auto-login';


export default function Apartments({ dataUser, dataApartments }) {

    const [isDeleting, setIsDeleting] = useState(false);

    const columns = [
        {
            name: "#",
            cell: (row, index) => <p className='font-bold'>{index + 1}</p>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'Lieu',
            selector: row => row.place,
            sortable: true,

        },
        {
            name: 'Superficie',
            selector: row => row.space,
            sortable: true,

        },
        {
            name: 'Étage',
            selector: row => row.class,
            sortable: true,

        },
        {
            name: 'Statut',
            selector: row => row.status,
            sortable: true,

        },
        {
            name: 'Localisation',
            selector: row => row.location,
            sortable: true,

        },
        {
            name: 'Prix',
            selector: row => row.price,
            sortable: true,
            allowOverflow: true,
        },
        {
            name: "",
            cell: row => <div className="flex items-center gap-2">
                <button onClick={() => deleteApartment(row.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 duration-100 hover:text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
                <Link href={`/admin/apartments/apartment/${row.id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer duration-100 hover:text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </Link>
            </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const { setUser, setApartments, apartments } = useUserContext();

    const deleteApartment = async (id) => {

        if (confirm("Confirmer la suppression ?")) {
            setIsDeleting(true);
            const response = await fetch(`apartments/${id}`, 'delete', {}, dataUser.token);
            if (response.status === 200) {
                setIsDeleting(false);
                toast.notify(`l'appartement a été supprimée!`, {
                    duration: 2,
                    type: "success"
                })
                const newApartments = apartments.filter(apartment => apartment.id !== id);
                setApartments(newApartments);
            }
        }
    }

    useEffect(() => {
        if (dataUser) {
            setUser(dataUser);
            setApartments(dataApartments);
        }
    }, []);

    return (
        <>
            {isDeleting && <Loader />}
            <div className="px-8 py-4 shadow-sm w-full relative">
                <div className="absolute z-10 -top-[100px] bg-red-400">
                    <ToastContainer />
                </div>
                <ApartmentsHeader />
                <div className="max-w-full">
                    <CustomDataTable columns={columns} data={apartments} />
                </div>
            </div>
        </>

    )
}

export async function getServerSideProps(ctx) {
    const token = ctx.req.cookies != undefined ? ctx.req.cookies.token : '';
    const response = await fetch('apartments', 'get', {}, token);
    const data = await AutoLogin(ctx);
    return {
        props: {
            dataUser: data.dataUser,
            dataApartments: response.data,
        }
    }
}

