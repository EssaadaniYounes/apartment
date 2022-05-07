import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-nextjs-toast'
import fetch from '../../../helpers/fetch-data';
import { AutoLogin } from '../../../helpers/auto-login';
import { useUserContext } from '../../../context/user';
import { CustomDataTable, Loader, TablesHeader } from '../../../components/parts';

function index({ dataSales, dataUser }) {
    const { setSales, setUser, sales } = useUserContext();
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
            name: "",
            cell: row => <div className="flex items-center gap-2">
                <button onClick={() => deleteSale(row.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 duration-100 hover:text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
                <Link href={`/admin/sales/sale/${row.id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer duration-100 hover:text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </Link>
                <Link href={`/admin/sales/sale/payments/${row.id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer duration-100 hover:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </Link>
            </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'Client',
            selector: row => row.name,
            sortable: true,

        },
        {
            name: 'Propertié',
            selector: row => row.city,
            sortable: true,

        },
        {
            name: 'Prix vente',
            selector: row => row.agreed_amount,
            sortable: true,

        },
        {
            name: 'Nature payment',
            selector: row => row.payment_nature,
            sortable: true,

        },

    ];
    const filterSales = (search) => {
        const filtredSales = dataSales.filter(sale => {
            return sale.name.toLowerCase().includes(search.toLowerCase()) ||
                sale.city.toLowerCase().includes(search.toLowerCase()) ||
                sale.payment_nature.toLowerCase().includes(search.toLowerCase()) ||
                sale.agreed_amount.toString().toLowerCase().includes(search.toLowerCase())
        })
        setSales(filtredSales);
    }
    const deleteSale = async (id) => {
        if (confirm('confirmer la suppression')) {
            setIsDeleting(true);
            const response = await fetch(`sales/${id}`, 'delete', {}, dataUser.token);
            if (response.status == 200) {
                toast.notify('vente bien supprimée !', {
                    duration: 2,
                    type: "success"
                })
                //filter sales by the id
                const newSales = sales.filter(sale => sale.id !== id);
                setSales(newSales);
                setIsDeleting(false);
            }
        }
    }

    useEffect(() => {
        if (dataSales.length) {
            setSales(dataSales);
            setUser(dataUser);
        }
    }, []);
    return (
        <>
            {isDeleting && <Loader />}
            <div className="px-4 sm:px-8 py-4 shadow-sm w-full relative">
                <div className="absolute z-10 -top-[100px] bg-red-400">
                    <ToastContainer />
                </div>
                <TablesHeader to='/admin/sales/add' title='List de ventes' />
                <div className="relative ml-6 mt-8 z-0 mb-6 w-full md:w-[49%] group">
                    <input type="text"
                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=" "
                        onKeyUp={(e) => { filterSales(e.target.value) }} />
                    <label className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Chercher</label>
                </div>
                <div className="max-w-full">
                    <CustomDataTable columns={columns} data={sales} />
                </div>
            </div>
        </>
    )
}
export const getServerSideProps = async (ctx) => {
    const response = await fetch('sales', 'get', {}, ctx.req.cookies['token']);
    const userResponse = await AutoLogin(ctx);
    return {
        props: {
            dataUser: userResponse.dataUser,
            dataSales: response.data
        }
    }
}
export default index