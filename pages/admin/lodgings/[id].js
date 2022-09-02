import React, { useEffect } from 'react';
import { AutoLogin } from '../../../helpers/auto-login';
import fetch from '../../../helpers/fetch-data';
import { ProjectDetails, SoldedProperties } from '../../../components/parts';
import { useUserContext } from '../../../context/user';
import { getNextPayment } from '../../../helpers/get-next-payment';

function LodgingDetails({ dataUser, lodging, details, nextPayments }) {
    const { setUser } = useUserContext();
    useEffect(() => {
        setUser(dataUser);
    }, []);
    return (
        <>
            <ProjectDetails lodging={lodging} details={details} />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-4">
                {
                    //create a table containing type of propertie and client name and the agreed amount and advanced amount and rest and the next payment
                    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                                <th className="px-6 py-3">Propriéte</th>
                                <th className="px-6 py-3">Nom</th>
                                <th className="px-6 py-3">Prix de vente</th>
                                <th className="px-6 py-3">Avance</th>
                                <th className="px-6 py-3">Somme</th>
                                <th className="px-6 py-3">Le reste</th>
                                <th className="px-6 py-3">Echiance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                details.map((payment, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{payment.type + (payment.type == "appartment" ? ' N° ' + payment.num_apartment : '')}</td>
                                        <td className="px-6 py-3">{payment.client_name}</td>
                                        <td className="px-6 py-3">{payment.agreed_amount}</td>
                                        <td className="px-6 py-3">{payment.advanced_amount}</td>
                                        <td className="px-6 py-3">{(+payment.agreed_amount - +payment.rest)}</td>
                                        <td className="px-6 py-3">{payment.rest}</td>
                                        <td className="px-6 py-3">{getNextPayment(payment.client_id, nextPayments)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                        {/* create a footer contains the sum of agreed amount ad sum of advanced_amount and sum of rest*/}
                        <tfoot className="bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">Total</td>
                                <td className="px-6 py-3"></td>
                                <td className="px-6 py-3">{details.reduce((acc, cur) => +acc + +cur.agreed_amount, 0)}</td>
                                <td className="px-6 py-3">{details.reduce((acc, cur) => +acc + +cur.advanced_amount, 0)}</td>
                                <td className="px-6 py-3">{details.reduce((acc, cur) => +acc + (+cur.agreed_amount - +cur.rest), 0)}</td>
                                <td className="px-6 py-3">{details.reduce((acc, cur) => +acc + +cur.rest, 0)}</td>
                                <td className="px-6 py-3"></td>
                            </tr>
                        </tfoot>
                    </table>

                }
            </div>
            {/* <SoldedProperties details={details} /> */}
        </>
    )
}

export async function getServerSideProps(ctx) {
    const response = await AutoLogin(ctx);
    const { id } = ctx.params;
    const res = await fetch(`lodgings/lodging/${id}`, 'get', {}, ctx.req.cookies.token);
    console.log(res);
    return {
        props: {
            dataUser: response.dataUser,
            lodging: res.data.lodging[0],
            details: res.data.details,
            nextPayments: res.data.nextPayments,
            freeProperties: res.data.free[0].free,
        }
    }
}


export default LodgingDetails