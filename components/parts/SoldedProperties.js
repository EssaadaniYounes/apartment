import React from 'react'
import CustomDataTable from './CustomDataTable';

function SoldedProperties({ details }) {
    
    return (
        <div className='mt-6'>
            <h1 className='font-bold text-center w-fit text-xl mx-auto border-b mb-4'>Bién Soldé</h1>
            {
                details.map()
            }
        </div>
    )
}

export default SoldedProperties