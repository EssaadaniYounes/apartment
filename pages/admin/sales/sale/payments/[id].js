import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { toast, ToastContainer } from 'react-nextjs-toast'
import { AutoLogin } from '../../../../../helpers/auto-login';
import fetch from '../../../../../helpers/fetch-data';
import { useUserContext } from '../../../../../context/user';
import { SaleCard, CustomDataTable, TablesHeader, Loader } from '../../../../../components/parts'

function index({ dataPayments, dataUser }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const { setPayments, setUser, payments } = useUserContext();

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
                <button onClick={() => deletePayment(row.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 duration-100 hover:text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
                <Link href={`/admin/sales/sale/payments/payment/${row.id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer duration-100 hover:text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </Link>

            </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }, {
            name: 'Amount',
            selector: row => row.amount,
            sortable: true,
        }, {
            name: 'Date de payment',
            selector: row => row.payment_date,
            sortable: true,
        }

    ];


    const deletePayment = async (id) => {
        if (confirm('confirmer la suppression')) {
            setIsDeleting(true);
            const res = await fetch(`payments/${id}`, 'delete', {}, dataUser.token);
            if (res.status === 200) {
                const _payments = payments.filter(payment => payment.id != id);
                setPayments(_payments);
                toast.notify('Payment bien supprimé', { duration: 2, type: 'success' });
            }
            setIsDeleting(false);
        }
    }

    useEffect(() => {
        //fill the payments in the context
        if (dataPayments.length) {
            setPayments(dataPayments);
        }
        setUser(dataUser);
    }, [])

    return (
        <>
            <ToastContainer />
            {isDeleting && <Loader />}
            {dataPayments.length > 0 && <SaleCard data={dataPayments[0]} />}
            <div className='mt-4'>
                <TablesHeader to='/admin/sales/sale/payments/add' title='Payments' />

                <CustomDataTable columns={columns} data={payments} />
            </div>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const response = await AutoLogin(ctx);
    const { id } = ctx.params;
    const payments = await fetch(`payments/sale/${id}`, 'get', {}, ctx.req.cookies.token);
    return {
        props: {
            dataUser: response.dataUser,
            dataPayments: payments.data
        }
    }
}

export default index