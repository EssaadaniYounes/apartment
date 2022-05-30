import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-nextjs-toast'
import fetch from '../../../helpers/fetch-data';
import { AutoLogin } from '../../../helpers/auto-login';
import { useUserContext } from '../../../context/user';
import { CustomDataTable, Loader, TablesHeader } from '../../../components/parts';
import { can } from '../../../helpers/can';

function index({ dataUsers, dataUser }) {
    const { setUsers, setUser, users } = useUserContext();
    const [isDeleting, setIsDeleting] = useState(false);
    const permission = dataUser.roles.permissions.utilisateurs;
    const columns = [
        {
            name: "#",
            cell: (row, index) => <p className='font-bold'>{index + 1}</p>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: "",
            cell: row => <div className="flex items-center gap-2">
                {
                    can(permission, 'delete') && <button onClick={() => deleteUser(row.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 duration-100 hover:text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                }
                {
                    can(permission, 'update') && <Link href={`/admin/roles/role/${row.id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer duration-100 hover:text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </Link>
                }
            </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'name',
            selector: row => row.name,
            sortable: true,

        },
        {
            name: 'email',
            selector: row => row.email,
            sortable: true,

        },
        {
            name: 'role',
            selector: row => row.role_name,
            sortable: true,

        },

    ];
    const filterUsers = (search) => {
        const filtredUsers = dataUsers.filter(user => {
            return user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase()) ||
                user.role_name.toLowerCase().includes(search.toLowerCase())
        })
        setSales(filtredUsers);
    }
    const deleteUser = async (id) => {
        if (confirm('confirmer la suppression')) {
            setIsDeleting(true);
            const response = await fetch(`users/${id}`, 'delete', {}, dataUser.token);
            if (response.status == 200) {
                toast.notify('user bien supprimée !', {
                    duration: 2,
                    type: "success"
                })
                //filter sales by the id
                const newUsers = users.filter(user => user.id !== id);
                setSales(newUsers);
                setIsDeleting(false);
            }
        }
    }

    useEffect(() => {
        if (dataUsers.length) {
            setUsers(dataUsers);
            setUser(dataUser);
        }
    }, []);
    return (
        <>
            {isDeleting && <Loader />}
            <div className="px-4 sm:px-8 py-4 shadow-sm w-full relative">
                <div className="absolute z-10 -top-[100px] bg-red-400">
                    <ToastContainer />
                </div>
                <TablesHeader to={can(permission, 'create') && '/admin/users/add'} title={`List D'utilisateurs`} />
                <div className="relative ml-6 mt-8 z-0 mb-6 w-full md:w-[49%] group">
                    <input type="text"
                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        placeholder=" "
                        onKeyUp={(e) => { filterUsers(e.target.value) }} />
                    <label className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Chercher</label>
                </div>
                <div className="max-w-full">
                    <CustomDataTable columns={columns} data={users} />
                </div>
            </div>
        </>
    )
}
export const getServerSideProps = async (ctx) => {
    const response = await fetch('users', 'get', {}, ctx.req.cookies['token']);
    const userResponse = await AutoLogin(ctx);
    return {
        props: {
            dataUser: userResponse.dataUser,
            dataUsers: response.data
        }
    }
}
export default index