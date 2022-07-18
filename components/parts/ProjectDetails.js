import React from 'react'

function ProjectDetails({ lodging, freeProperties, details }) {
    return (
        <div className="flex items-start shadow-sm py-8 px-6 w-full justify-around">
            <div className="flex justify-around flex-col sm:flex-row gap-y-2 w-full">
                <span>
                    <span className="font-semibold mr-3">Nom Projet :</span> {lodging.name}
                </span>
                <span>
                    <span className="font-semibold mr-3">Adresse :</span> {lodging.address}
                </span>
                <span>
                    <span className="font-semibold mr-3">Ville :</span> {lodging.city}
                </span>
                <span className='flex items-center'>
                    <span className="font-semibold mr-3">Plan :</span>
                    <a href={`/admin/lodgings/plan/${lodging.id}`} className='flex items-center  text-cyan-500 background-transparent font-bold uppercase px-4 py-[6px] text-xs outline-none focus:outline-none rounded-md hover:bg-cyan-500 hover:text-white ml-3 box-border mr-1 -mb-1 ease-linear transition-all duration-150'>
                        Suivre
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                        </svg>
                    </a>
                </span>
            </div>

        </div>
    )
}

export default ProjectDetails