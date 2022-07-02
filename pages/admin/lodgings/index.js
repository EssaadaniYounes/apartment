import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-nextjs-toast'
import fetch from '../../../helpers/fetch-data';
import { AutoLogin } from '../../../helpers/auto-login';
import { useUserContext } from '../../../context/user';
import { AddLodging, Loader, Project, TablesHeader } from '../../../components/parts';
import { can } from '../../../helpers/can';
import Link from 'next/link';

function index({ newLodgings, user }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showAddLodging, setShowAddLodging] = useState(false);
    const { setLodgings, setUser, lodgings } = useUserContext();
    const permission = user?.roles?.permissions?.projets;

    useEffect(() => {
        if (user) {
            setUser(user);
            setLodgings(newLodgings);
        }
    }, []);
    //functions
    const filterLodgings = (value) => {
        if (!value) return setLodgings(newLodgings);
        const filteredLodgings = newLodgings.filter(lodging => {

            return (
                lodging.name.toLowerCase().includes(value.toLowerCase()) ||
                lodging.city.toLowerCase().includes(value.toLowerCase())
            )
        }
        );
        setLodgings(filteredLodgings);
    }

    const notify = () => {
        toast.notify('Projet bien supprimé', {
            duration: 2,
            type: 'success'
        });
    }

    return (
        <>
            {isDeleting && <Loader />}
            <div className="px-0 sm:px-8 py-4 shadow-sm w-full relative">
                <div className="absolute z-10 -top-[100px] bg-red-400">
                    <ToastContainer />
                </div>
                <div className='w-full sm:px-6 flex justify-between flex-col sm:flex-row items-center'>
                    <span className='text-xl w-full block mb-6 sm:mr-4 font-semibold text-gray-600  border-b'>
                        Liste des projets
                    </span>
                    {
                        can(permission, 'create') && <span onClick={() => setShowAddLodging(true)} className='flex cursor-pointer items-center w-1/3 justify-center sm:w-fit gap-1 bg-blue-500 py-1 px-4 rounded-lg shadow-md font-semibold text-gray-50 duration-150 hover:bg-blue-700'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Ajouter</span>
                        </span>}
                </div>
                <div className="relative md:ml-6 mt-8 mx-auto z-0 mb-6 max-w-[80%] md:w-[49%] group">
                    <input type="text"
                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=" "
                        onKeyUp={(e) => { filterLodgings(e.target.value) }} />
                    <label className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Chercher</label>
                </div>
            </div>
            {showAddLodging && <AddLodging setShowModal={setShowAddLodging} setIsLoading={setIsDeleting} />}
            <div className='mx-4 mt-2 items-center gap-y-3 grid gap-x-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    lodgings.map(lodging => <Project key={lodging.id} lodging={lodging} onNotify={notify} setIsLoading={setIsDeleting} />
                    )
                }
            </div>
        </>
    )
}
export async function getServerSideProps(ctx) {
    const res = await fetch('lodgings', 'get', {}, ctx.req.cookies.token);
    const user = await AutoLogin(ctx);
    return {
        props: {
            newLodgings: res.data,
            user: user.dataUser
        }
    }
}
export default index