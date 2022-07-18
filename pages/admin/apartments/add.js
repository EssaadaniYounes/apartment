import React, { useEffect } from 'react'
import { AddApartment } from '../../../components/parts'
import fetch from '../../../helpers/fetch-data';
import { AutoLogin } from '../../../helpers/auto-login';
import { useUserContext } from '../../../context/user';

function Add({ dataUser, lodgings, apartments }) {
    const { setUser, setLodgings, setApartments } = useUserContext();
    useEffect(() => {
        if (dataUser) {
            setUser(dataUser);
            setLodgings(lodgings);
            setApartments(apartments);
        }
    }, []);
    return (
        <div className='py-3 px-2 md:p-8'>
            <span className='text-xl pb-1 font-semibold text-gray-600 block border-b'>
                Ajouter un appartement
            </span>
            <AddApartment />
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const token = ctx.req.cookies != undefined ? ctx.req.cookies.token : '';
    const response = await fetch('lodgings', 'get', {}, token);
    const apartmentsResponse = await fetch('properties', 'get', {}, token);
    const data = await AutoLogin(ctx);
    return {
        props: {
            dataUser: data.dataUser,
            lodgings: response.data,
            apartments: apartmentsResponse.data
        }
    }
}

export default Add