import React, { useEffect } from 'react'
import { Sale } from '../../../components/parts'
import { useUserContext } from '../../../context/user'
import { AutoLogin } from '../../../helpers/auto-login'
import fetch from '../../../helpers/fetch-data';

function add({ dataUser, properties, clients }) {
    console.log(properties);
    const { setUser, setApartments, setClients } = useUserContext();

    useEffect(() => {
        if (dataUser) {
            setUser(dataUser);
            setApartments([]);
            setApartments(properties);
            setClients(clients);
        }
    }, []);
    return (
        <div className='p-8'>
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
    return {
        props: {
            dataUser: data.dataUser,
            properties: propertiesResponse.data,
            clients: clientsResponse.data
        }
    }
}

export default add