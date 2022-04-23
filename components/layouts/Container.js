import { useRouter } from 'next/router';
import React from 'react'
import { Header, SideBar } from '../parts';

function Container(props) {
    const router = useRouter();
    return (
        <div className='flex overflow-y-hidden max-h-screen'>
            {router.pathname != '/auth' && <SideBar />}
            <div className={`flex-1  z-0 ${router.pathname == '/auth' ? '' : 'max-w-[84%]'}`}>
                {router.pathname != '/auth' && <Header />}
                <div className='max-h-screen overflow-y-auto pb-[5rem]'>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Container