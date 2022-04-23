import React from 'react'
import Link from 'next/link'

function AddApartment() {
    return (
        <div className='w-full px-6 flex justify-between items-center'>
            <span className='text-xl font-semibold text-gray-600 block border-b'>
                Appartements
            </span>
            <Link href='/admin/apartments/add'>
                <a className='flex items-center gap-1 bg-blue-500 py-1 px-4 rounded-lg shadow-md font-semibold text-gray-50 duration-150 hover:bg-blue-700'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Ajouter</span>
                </a>
            </Link>
        </div>
    )
}

export default AddApartment