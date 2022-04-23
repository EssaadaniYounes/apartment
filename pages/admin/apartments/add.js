import React from 'react'
import { AddApartment } from '../../../components/parts'

function Add() {
    return (
        <div className='p-8'>
            <span className='text-xl pb-1 font-semibold text-gray-600 block border-b'>
                Ajouter un appartement
            </span>
            <AddApartment />
        </div>
    )
}

export default Add