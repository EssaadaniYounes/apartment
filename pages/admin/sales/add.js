import React, { useEffect } from 'react'
import { Sale } from '../../../components/parts'
import { useUserContext } from '../../../context/user'
import { AutoLogin } from '../../../helpers/auto-login'
import fetch from '../../../helpers/fetch-data';

function add({ dataUser, properties, clients, lodgings }) {
    const { setUser, setApartments, setClients, setLodgings } = useUserContext();

    useEffect(() => {
        setUser(dataUser);
        setApartments(properties);
        setClients(clients);
        setLodgings(lodgings);
    }, []);
    return (
        <div className='py-3 px-2 md:p-8'>
            <span className='text-xl pb-1 font-semibold text-gray-600 block border-b'>
                Ajouter un vente
            </span>
            <Sale />
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    const data = await AutoLogin(ctx);
    const propertiesResponse = await fetch('available', 'get', {}, ctx.req.cookies.token);
    const clientsResponse = await fetch('clients', 'get', {}, ctx.req.cookies.token);
    const lodgingsResponse = await fetch('lodgings', 'get', {}, ctx.req.cookies.token);
    return {
        props: {
            dataUser: data.dataUser,
            properties: propertiesResponse.data,
            clients: clientsResponse.data,
            lodgings: lodgingsResponse.data
        }
    }
}

export default add