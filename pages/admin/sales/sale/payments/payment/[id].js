import React, { useEffect, useState } from 'react'
import { Payment } from '../../../../../../components/parts'
import { useUserContext } from '../../../../../../context/user'
import fetch from '../../../../../../helpers/fetch-data'
import { AutoLogin } from '../../../../../../helpers/auto-login'

function edit({ dataUser, properties, clients, sales, payment, id }) {
    const { setApartments, setClients, setUser, setSales } = useUserContext();
    const [saleDetails, setSalesDetails] = useState(null);

    useEffect(() => {

        if (dataUser) {
            setUser(dataUser);
            setApartments(properties);
            setClients(clients);
            setSales(sales);
        }
        const sale = sales.find(sale => sale.id == payment.sale_id);
        setSalesDetails(sale);
    }, [])

    return (
        <div className='py-3 px-2 md:p-8'>
            <span className='text-xl pb-1 font-semibold text-gray-600 block border-b'>
                Modifier un payment
            </span>
            {saleDetails && <Payment payment={payment} saleDetails={saleDetails} />}
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    const { id } = ctx.params;
    const data = await AutoLogin(ctx);
    const propertiesResponse = await fetch('properties', 'get', {}, ctx.req.cookies.token);
    const clientsResponse = await fetch('clients', 'get', {}, ctx.req.cookies.token);
    const salesResponse = await fetch('sales', 'get', {}, ctx.req.cookies.token);
    const payment = await fetch(`payments/${id}`, 'get', {}, ctx.req.cookies.token);
    return {
        props: {
            dataUser: data.dataUser,
            properties: propertiesResponse.data,
            clients: clientsResponse.data,
            sales: salesResponse.data,
            payment: payment.data,
            id: id
        }
    }
}

export default edit