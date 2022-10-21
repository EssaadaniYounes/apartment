import React, { useEffect } from 'react'
import { ProjectPayment } from '../../../../../components/parts'
import { useUserContext } from '../../../../../context/user';
import { AutoLogin } from '../../../../../helpers/auto-login';
import fetch from '../../../../../helpers/fetch-data';
function add({ dataUser, payment, clients, lodgings }) {
    const { setUser, setClients, setLodgings } = useUserContext();

    useEffect(() => {
        setUser(dataUser);
        setClients(clients);
        setLodgings(lodgings);
    }, []);

    return (
        <div className="px-2">
            <ProjectPayment payment={payment} />
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const { id } = ctx.params;
    const { dataUser } = await AutoLogin(ctx);
    const { data } = await fetch('project_payments/items/related_items', 'get', {}, ctx.req.cookies.token);
    const { data: payment } = await fetch('project_payments/' + id, 'get', {}, ctx.req.cookies.token);
    return {
        props: {
            dataUser,
            payment: payment.data,
            clients: data.items.clients,
            lodgings: data.items.lodgings
        }
    }
}

export default add