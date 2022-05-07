import React from 'react'
import { Client } from '../../../components/parts'

function add() {
  return (
    <div className='p-8'>
      <span className='text-xl pb-1 font-semibold text-gray-600 block border-b'>
        Ajouter un client
      </span>
      <Client />
    </div>
  )
}

export default add