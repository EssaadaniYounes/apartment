import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { AddApartment } from '../../../../components/parts';
import { useUserContext } from '../../../../context/user';
import { AutoLogin } from '../../../../helpers/auto-login';
import fetch from '../../../../helpers/fetch-data';

function EditApartment({ dataUser, apartment }) {
    const { setUser } = useUserContext();
    const router = useRouter();
    useEffect(() => {
        if (dataUser) {
            setUser(dataUser);
        }
        if (!apartment) {
            router.push('/admin/apartments');
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
    const apartment = await fetch(`apartments/${id}`, 'get', {}, ctx.req.cookies.token);
    return {
        props: {
            dataUser: response.dataUser,
            apartment: apartment.data
        }
    }
}


export default EditApartment