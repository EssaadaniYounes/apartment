import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useRef } from 'react'
import { useUserContext } from '../../context/user';
import { setCookie } from '../../helpers/cookies';
import fetch from '../../helpers/fetch-data';

function Login() {
    const email = useRef();
    const password = useRef();
    const [error, setError] = useState(false);
    const { setUser } = useUserContext();
    const router = useRouter();

    const handleLogin = async () => {
        const payload = {
            'email': email.current.value,
            'password': password.current.value
        }
        //validation
        if (payload.email.length === 0 || payload.password.length === 0) return setError('المرجو ملأ المعلومات أولا')

        const response = await fetch('login', 'post', payload, null);
        if (response.status === 404) return setError(response.data.data.error);
        //Redirect to dashboard page if user is logged in 
        if (response.status === 200) {
            setCookie('token', response.data.token, 30 * 24 * 60);
            localStorage.setItem('token', response.data.token);
            setCookie('email', payload.email, 30 * 24 * 60);
            setCookie('password', payload.password, 30 * 24 * 60);
            setUser(response.data);
            router.push('/admin/');
        };
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-2 text-left bg-white shadow-lg">
                <div className="relative flex items-center justify-center">
                    <Image src={'/images/logo.png'} width={160} height={150}/>
                </div>
                <h3 className="text-2xl font-semibold text-center text-gray-700">Connectez-vous au compte</h3>
                <div>
                    <div className="mt-4">
                        <div>
                            <label className="block" htmlFor="email">E-mail : </label>
                            <input type="text" placeholder="email"
                                ref={email}
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                        </div>
                        <div className="mt-4">
                            <label className="block">Mot de passe : </label>
                            <input type="password" placeholder="mot de passe"
                                ref={password}
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            {error && <span className="text-xs tracking-wide text-red-600">{error} </span>}</div>
                        <div className="flex items-baseline justify-center">
                            <button
                                onClick={handleLogin} className="flex flex-row-reverse gap-2 font-semibold px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                Connexion</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login