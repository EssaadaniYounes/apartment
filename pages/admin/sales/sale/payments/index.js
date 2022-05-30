import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-nextjs-toast'
import fetch from '../../../../../helpers/fetch-data';
import { AutoLogin } from '../../../../../helpers/auto-login';
import { useUserContext } from '../../../../../context/user';
import { CustomDataTable, Loader, TablesHeader } from '../../../../../components/parts';
import { can } from '../../../../../helpers/can';
function index({ dataPayments, dataUser, dataClients }) {
    const { setPayments, setUser, payments } = useUserContext();
    const [isDeleting, setIsDeleting] = useState(false);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const [clientId, setClientId] = useState(0);
    const permission = dataUser.roles.permissions.paiments;
    const columns = [
        {
            name: "#",
            cell: (row, index) => <p className='font-bold'>{index + 1}</p>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: "Actions",
            cell: row => <div className="flex items-center gap-2">
                {
                    can(permission, 'delete') && <button onClick={() => deletePayment(row.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 duration-100 hover:text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                }
                {
                    can(permission, 'update') && <Link href={`/admin/sales/sale/payments/payment/${row.id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer duration-100 hover:text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </Link>
                }
                {
                    can(permission, 'imprimer') && <Link href={`/admin/sales/sale/payment/print/${row.id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer duration-100 hover:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                    </Link>
                }
            </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'Num Payment',
            selector: row => row.num_payment,
            sortable: true,

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
            name: 'Amount',
            selector: row => row.amount,
            sortable: true,

        },
        {
            name: 'Date',
            selector: row => row.payment_date,
            sortable: true,

        },

    ];

    const deletePayment = async (id) => {
        if (confirm('confirmer la suppression')) {
            setIsDeleting(true);
            const response = await fetch(`payments/${id}`, 'delete', {}, dataUser.token);
            if (response.status == 200) {
                toast.notify('Payment bien supprimée !', {
                    duration: 2,
                    type: "success"
                })
                //filter sales by the id
                const newPayments = payments.filter(payment => payment.id != id);
                setPayments(newPayments);
                setIsDeleting(false);
            }
        }
    }

    const filterByClient = (id) => {
        if (id != 0) {
            const filtredPayments = dataPayments.filter(payment => payment.client_id == id);
            setPayments(filtredPayments);
        }
        else {
            setPayments(dataPayments);
        }
    }

    useEffect(() => {
        if (from != 0 && to != 0 && clientId != 0) {
            const filtredPayments = dataPayments.filter(payment => {
                const paymentDate = new Date(payment.payment_date).getTime();
                setFrom(v => new Date(from).getTime())
                setTo(v => new Date(to).getTime())
                return paymentDate >= from && paymentDate <= to && payment.client_id == clientId;

            });
            setPayments(filtredPayments);
        }
        else {
            setPayments(dataPayments);
        }

    }, [from, to]);


    useEffect(() => {
        if (dataPayments.length) {
            setPayments(dataPayments);
        }
        setUser(dataUser);
    }, []);
    return (
        <>
            {isDeleting && <Loader />}
            <div className="px-4 sm:px-8 py-4 shadow-sm w-full relative">
                <div className="absolute z-10 -top-[100px] bg-red-400">
                    <ToastContainer />
                </div>
                <TablesHeader to={can(permission, 'create') && '/admin/sales/sale/payments/add'} title='List de payments' />
                <div className='flex items-center'>
                    <div className="relative ml-6 mt-8 z-0 mb-6 w-full md:w-[30%] group">
                        <select
                            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                            onChange={(e) => { setClientId(e.target.value); filterByClient(e.target.value) }}>
                            <option value={0}>Tous les clients</option>
                            {dataClients.map(client => {
                                return <option value={client.id} key={client.id}>{client.name}</option>
                            })}
                        </select>
                        <label className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Chercher par client</label>
                    </div>
                    <div className="relative ml-6 mt-8 z-0 mb-6 w-full md:w-[30%] group">
                        <input type="date"
                            onChange={(e) => { setFrom(e.target.value); }}
                            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' />
                        <label className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>De</label>
                    </div>
                    <div className="relative ml-6 mt-8 z-0 mb-6 w-full md:w-[30%] group">
                        <input type="date"
                            onChange={(e) => { setTo(e.target.value); }}
                            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' />
                        <label className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>À</label>
                    </div>
                </div>
                <div className="max-w-full">
                    <CustomDataTable columns={columns} data={payments} />
                </div>
            </div>
        </>
    )
}
export const getServerSideProps = async (ctx) => {
    const response = await fetch('payments', 'get', {}, ctx.req.cookies['token']);
    const clients = await fetch('clients', 'get', {}, ctx.req.cookies['token']);
    const userResponse = await AutoLogin(ctx);
    return {
        props: {
            dataUser: userResponse.dataUser,
            dataPayments: response.data,
            dataClients: clients.data
        }
    }
}
export default index