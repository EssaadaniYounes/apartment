import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Header, Notifications, SideBar } from '../parts';

function Container(props) {
    const router = useRouter();
    const [undisplayedRoutes, setUndisplayedRoutes] = useState([
        '/auth',
    ]);
    useEffect(() => {
        //get route full url
        const route = router.pathname;
        if (route.includes('print')) {
            setUndisplayedRoutes(v => [...v, route]);
        }
    }, []);
    return (
        <>
            <Head>
                <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
            </Head>
            {router.pathname &&
                <div className='flex overflow-y-hidden max-h-screen'>
                    {router.pathname != "/auth" && <div className=' bg-white relative w-[16%]'><SideBar /></div>}
                    <div className={`flex-1 z-0 ${undisplayedRoutes.includes(router.pathname) ? 'max-w-[100%]' : 'max-w-[84%]'}`}>
                        {router.pathname != "/auth" && <Header />}
                        {router.pathname != "/auth" && < Notifications />}
                        <div className='max-h-screen overflow-y-auto pb-[5rem]'>
                            {props.children}
                        </div>
                    </div>
                </div>}
        </>

    )
}

export default Container