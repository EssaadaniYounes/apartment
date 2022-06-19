import Link from 'next/link';
import React, { useEffect } from 'react'
import { useRef } from 'react';
import { useUserContext } from '../../../../context/user';
import { AutoLogin } from '../../../../helpers/auto-login';
import fetch from '../../../../helpers/fetch-data'
import getBase64 from '../../../../helpers/get-image';

function plan({ lodging, dataUser }) {
    const { setUser } = useUserContext();
    const object = useRef(null);
    const embed = useRef(null);
    const link = useRef(null);
    useEffect(() => {
        setUser(dataUser);
        const getImageUrl = async (url, ref) => {
            const base64data = await getBase64(url, ref);
            return base64data;
        }
        if (lodging.image) {
            getImageUrl(`${lodging.plan}`, object)
            getImageUrl(`${lodging.plan}`, embed)
            getImageUrl(`${lodging.plan}`, link)
        }
    }, []);
    return (
        <div className='flex flex-col px-4 gap-y-6'>
            <div className='flex flex-col md:flex-row items-center justify-center'>
                <p className="flex-1 text-center mt-1 underline">
                    Plan De Projet <span className='font-semibold'> {lodging.name}</span>
                </p>
                <Link href={`/admin/lodgings/${lodging.id}`}>
                    <a className=' text-yellow-500 background-transparent block mt-3 rounded-md hover:shadow-md max-w-fit hover:bg-yellow-500 hover:text-white font-bold uppercase px-8 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>
                        Retour
                    </a>
                </Link>
            </div>

            <object ref={object} className='w-full '>
                <embed ref={embed} className='w-full' />
                <p>This browser does not support PDFs. Please download the PDF to view it: <a href={lodging.plan}>View the PDF</a>.</p>
            </object>

        </div >
    )
}

export async function getServerSideProps(ctx) {
    const { id } = ctx.query
    const lodging = await fetch(`lodgings/lodging/${id}`, 'get', {}, ctx.req.cookies.token);
    const user = await AutoLogin(ctx);
    return {
        props: {
            dataUser: user.dataUser,
            lodging: lodging.data.lodging[0],
        }
    }
}

export default plan