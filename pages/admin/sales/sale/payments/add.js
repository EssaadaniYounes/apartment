import React, { useEffect } from 'react'
import { Payment } from '../../../../../components/parts'
import { useUserContext } from '../../../../../context/user'
import fetch from '../../../../../helpers/fetch-data'
import { AutoLogin } from '../../../../../helpers/auto-login'

function add({ dataUser, properties, clients, sales }) {
  const { setApartments, setClients, setUser, setSales } = useUserContext();


  useEffect(() => {
    if (dataUser) {
      setUser(dataUser);
      setApartments(properties);
      setClients(clients);
      setSales(sales);
    }
  }, [])

  return (
    <div className='py-3 px-2 md:p-8'>
      <span className='text-xl pb-1 font-semibold text-gray-600 block border-b'>
        Ajouter un payment
      </span>
      <Payment />
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const data = await AutoLogin(ctx);
  const propertiesResponse = await fetch('properties', 'get', {}, ctx.req.cookies.token);
  const clientsResponse = await fetch('clients', 'get', {}, ctx.req.cookies.token);
  const salesResponse = await fetch('sales', 'get', {}, ctx.req.cookies.token);
  return {
    props: {
      dataUser: data.dataUser,
      properties: propertiesResponse.data,
      clients: clientsResponse.data,
      sales: salesResponse.data
    }
  }
}

export default add