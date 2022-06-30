import React, { useEffect } from 'react'
import { Sale } from '../../../../components/parts'
import { useUserContext } from '../../../../context/user'
import { AutoLogin } from '../../../../helpers/auto-login'
import fetch from '../../../../helpers/fetch-data';

function edit({ dataUser, properties, clients, sale }) {

    const { setUser, setApartments, setClients } = useUserContext();
    useEffect(() => {
        if (dataUser) {
            setUser(dataUser);
            setApartments(properties);
            setClients(clients);
        }
    }, []);
    return (
        <div className='py-3 px-2 md:p-8'>
            <span className='text-xl pb-1 font-semibold text-gray-600 block border-b'>
                Modifier un vente
            </span>
            <Sale sale={sale} />
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    const { id } = ctx.params;
    const res = await fetch(`sales/${id}`, 'get', {}, ctx.req.cookies.token);
    const data = await AutoLogin(ctx);
    const propertiesResponse = await fetch('available', 'get', {}, ctx.req.cookies.token);
    const clientsResponse = await fetch('clients', 'get', {}, ctx.req.cookies.token);
    return {
        props: {
            dataUser: data.dataUser,
            properties: propertiesResponse.data,
            clients: clientsResponse.data,
            sale: res.data
        }
    }
}

export default edit