import React, { useEffect } from 'react'
import { ProjectPayment } from '../../../../components/parts'
import { useUserContext } from '../../../../context/user';
import { AutoLogin } from '../../../../helpers/auto-login';
import fetch from '../../../../helpers/fetch-data';
function add({ dataUser, clients, lodgings }) {
    const { setUser, setClients, setLodgings } = useUserContext();

    useEffect(() => {
        setUser(dataUser);
        setClients(clients);
        setLodgings(lodgings);
    }, []);

    return (
        <div className="px-2">
            <ProjectPayment />
       </div>
    )
}

export async function getServerSideProps(ctx) {
    const { dataUser } = await AutoLogin(ctx);
    const { data } = await fetch('project_payments/items/related_items', 'get', {}, ctx.req.cookies.token);
    
    return {
        props: {
            dataUser,
            clients: data.items.clients,
            lodgings: data.items.lodgings
        }
    }
}

export default add