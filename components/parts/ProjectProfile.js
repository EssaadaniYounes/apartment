import React from 'react'

function ProjectProfile({ lodging }) {
    return (
        <>
            <div className='w-full max-h-[60%] relative h-[200px]' >
                {/* <img src={lodging.image} alt="Image Not Found" /> */}
                <img loading='lazy' src={lodging.image} alt="Inconnu" layout='fill' className='h-[110%] w-full mx-auto' />

            </div>
            <div className='mt-4 px-4'>
                <h1 className='font-semibold text-center'>{lodging.name}</h1>
                <div className='flex items-center gap-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#33af2e" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {lodging.city}
                </div>
                <div className='flex items-center gap-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#33af2e" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    {lodging.address}
                    
                </div>
                <div className='flex items-center gap-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#33af2e" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    {lodging.type}
                </div>
            </div>
        </>
    )
}

export default ProjectProfile