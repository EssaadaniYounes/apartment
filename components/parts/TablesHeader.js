import React from 'react'
import Link from 'next/link'

function TablesHeader({ to = null, title }) {
    return (
        <div className='w-full sm:px-6 flex justify-between flex-col sm:flex-row items-center'>
            <span className='text-xl w-full block mb-6 sm:mr-4 font-semibold text-gray-600  border-b'>
                {title}
            </span>
            {to && <Link href={to}>
                <a className='flex items-center w-1/3 justify-center sm:w-fit gap-1 bg-blue-500 py-1 px-4 rounded-lg shadow-md font-semibold text-gray-50 duration-150 hover:bg-blue-700'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Ajouter</span>
                </a>
            </Link>}
        </div>
    )
}

export default TablesHeader