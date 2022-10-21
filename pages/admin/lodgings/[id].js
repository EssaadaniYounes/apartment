import React, { useEffect, useState } from 'react';
import { AutoLogin } from '../../../helpers/auto-login';
import fetch from '../../../helpers/fetch-data';
import { Empty, ProjectItem } from '../../../components/parts';
import { useUserContext } from '../../../context/user';
import { getNextPayment } from '../../../helpers/get-next-payment';
import currency from '../../../helpers/money';
import { calcTotal, getLastPayment } from '../../../helpers/calc-boughts';
import Link from 'next/link';

function LodgingDetails({ dataUser, payments, items }) {
    const { setUser, projectPaymentItems, setProjectPaymentItems, projectPayments, setProjectPayments } = useUserContext();
    const [showAddPayment, setShowAddPayment] = useState(false);
    const [selectedId, setSelectedId] = useState(0);
    useEffect(() => {
        setUser(dataUser);
        setProjectPaymentItems(items);
        setProjectPayments(payments);
    }, []);
    const handleClick = (id) => {
        setSelectedId(id);
        setShowAddPayment(true);
    }
    return (
        <div className="">
            <div className="w-full h-[50px] shadow-sm shadow-gray-300 bg-gray-100 flex items-center justify-end">
                <Link href={`/admin/lodgings/project_payments/add`}>
                    <a className="bg-blue-400 mr-2 py-2 px-4 rounded-md text-white font-semibold duration-150 hover:bg-blue-500">Ajouter</a>
                </Link>
            </div>
            {showAddPayment && <ProjectItem setState={setShowAddPayment} project_id={selectedId} />}
            {
                projectPayments.length > 0
                    ? <div className="pt-4">
                        <h2 className="mx-auto mb-2 w-fit text-xl md:text-2xl font-semibold">{payments[0].name}</h2>
                        <div className="w-full">
                            <table className="pos-table w-full text-center">
                                <thead>
                                    <tr>
                                        <th>N° lot</th>
                                        <th>Nom</th>
                                        <th>Prix de vente</th>
                                        <th>+</th>
                                        <th>Avance</th>
                                        <th>Somme</th>
                                        <th>Le reste</th>
                                        <th>Echiance</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projectPayments.map(pay =>
                                        <tr key={pay.id}>
                                            <td>{pay.num_lot}</td>
                                            <td>{pay.client_name}</td>
                                            <td>{currency(pay.price)}</td>
                                            <td>{currency(pay.paid)}</td>
                                            <td>{currency(pay.advanced_amount)}</td>
                                            <td>{currency(pay.total)}</td>
                                            <td>{currency(pay.rest)}</td>
                                            <td>{getLastPayment(pay.id, projectPaymentItems)}</td>
                                            <td className="post-table-action">
                                                <span onClick={() => handleClick(pay.id)} className='bg-blue-400 text-[16px] text-white rounded-md py-1.5 m-1 block font-bold duration-200 hover:bg-gray-200 hover:text-blue-700 cursor-pointer'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-5.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                                                    </svg>
                                                </span>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="2" className="font-semibold text-lg">Total</td>
                                        <td>{currency(calcTotal(projectPayments, 'price'))}</td>
                                        <td>{currency(calcTotal(projectPayments, 'paid'))}</td>
                                        <td>{currency(calcTotal(projectPayments, 'advanced_amount'))}</td>
                                        <td>{currency(calcTotal(projectPayments, 'total'))}</td>
                                        <td>{currency(calcTotal(projectPayments, 'rest'))}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div >
                    : <Empty title='Payments' />
            }
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const { dataUser } = await AutoLogin(ctx);
    const { id } = ctx.params;
    const { data: payments } = await fetch(`project_payments/payments/${id}`, 'get', {}, ctx.req.cookies.token);
    
    return {
        props: {
            dataUser,
            payments: payments.data.payments,
            items: payments.data.items
        }
    }
}


export default LodgingDetails