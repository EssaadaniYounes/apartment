import React, { useEffect, useState } from 'react'
import { Form } from '../../../components/parts';
import { roles } from '../../../helpers/roles';
import fetch from '../../../helpers/fetch-data';
import { AutoLogin } from '../../../helpers/auto-login';
import { useUserContext } from '../../../context/user';
const classes = {
    label: 'absolute text-[18px]-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
    input: 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
}
function add({ dataUser }) {
    const { setUser } = useUserContext();
    const [name, setName] = useState('');
    const [permissions, setPermissions] = useState({});

    useEffect(() => {
        setUser(dataUser);
    }, []);

    const handleCheckBox = (e, permission) => {
        if (e.target.checked) {
            const per = permissions;
            per[permission] = typeof permissions[permission] == 'undefined' ? [] : permissions[permission];
            per[permission].push(e.target.name)
            setPermissions(per);
        }
        else {
            //remove action from permissions of the permission
            const per = permissions;
            per[permission] = permissions[permission].filter(action => action !== e.target.name);
            setPermissions(per);
        }
        console.log(permissions);
    }

    const addRole = async () => {
        const payload = {
            'role_name': name,
            'permissions': permissions
        }
        const response = await fetch('roles', 'post', payload, localStorage.getItem('token'));
        setName('');
        setPermissions({});

        console.log(response);
    }

    return (
        <Form>
            <div className="relative z-0 mb-6 w-1/4 group">
                <input type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={classes.input}
                    placeholder=" "
                />
                <label className={classes.label}>Nom Role</label>
            </div>
            <div>
                {/* Create checkboxes roles based on the roles variable */}
                {
                    Object.keys(roles).map((role, index) => {
                        return (
                            <div key={role} className='flex justify-between items-center'>
                                <h1 className='w-[14%] font-semibold capitalize text-gray-700'>{role} :</h1>
                                <div className='mt-4 flex flex-wrap justify-between w-full items-center ml-6'>
                                    {

                                        roles[role].map((action, index) => {
                                            return (
                                                <div key={action} className='flex items-center w-1/4'>
                                                    {/* onChange of checkbox if is checked add it to the roles */}
                                                    <input type="checkbox"
                                                        name={action}
                                                        id={role + '_' + action}
                                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                                        onChange={(e) => { handleCheckBox(e, role) }}
                                                    />
                                                    <label className='ml-1 capitalize' htmlFor={role + '_' + action}>{action}</label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <button onClick={() => addRole()} className=" mt-8 relative block min-w-[20%] h-[45px] mx-auto sm:w-fit p-0.5 mb-2  overflow-hidden  font-medium text-md rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 text-blue-700 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span className="relative  min-w-full flex items-center justify-center h-full sm:text-right  sm:w-fit  px-5 md:px-12 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                        Enregistrer
                    </span>
                </span>
            </button>
        </Form>
    )
}

export const getServerSideProps = async (ctx) => {
    const res = await AutoLogin(ctx);
    return {
        props: {
            dataUser: res.dataUser
        }
    }
}
export default add