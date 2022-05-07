import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { AddApartment } from '../../../../components/parts';
import { useUserContext } from '../../../../context/user';
import { AutoLogin } from '../../../../helpers/auto-login';
import fetch from '../../../../helpers/fetch-data';

function EditApartment({ dataUser, apartment, lodgings }) {
    const { setUser, setLodgings } = useUserContext();
    const router = useRouter();
    useEffect(() => {
        if (dataUser) {
            setUser(dataUser);
            setLodgings(lodgings);
        }
        if (!apartment) {
            router.push('/admin/apartments/add');
        }
    }, []);

    return (
        <div className='p-8'>
            <span className='text-xl pb-1 font-semibold text-gray-600 block border-b'>
                Modifier un appartement
            </span>
            <AddApartment apartment={apartment} />
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const response = await AutoLogin(ctx);
    const { id } = ctx.params;
    const lodgings = await fetch('lodgings', 'get', {}, ctx.req.cookies.token);
    const apartment = await fetch(`properties/${id}`, 'get', {}, ctx.req.cookies.token);
    return {
        props: {
            dataUser: response.dataUser,
            apartment: apartment.data,
            lodgings: lodgings.data,
        }
    }
}


export default EditApartment