import React from 'react'
import { useEffect } from 'react';
import { AutoLogin } from '../../../helpers/auto-login';
import { Client } from '../../../components/parts'
import { useUserContext } from '../../../context/user'

function add({ dataUser }) {
  const { setUser } = useUserContext();
  useEffect(() => {
    setUser(dataUser)
  }, []);
  return (
    <div className='py-3 px-2 md:p-8'>
      <span className='text-xl pb-1 font-semibold text-gray-600 block border-b'>
        Ajouter un client
      </span>
      <Client />
    </div>
  )
}
export const getServerSideProps = async (ctx) => {
  const userResponse = await AutoLogin(ctx);
  return {
    props: {
      dataUser: userResponse.dataUser,
    }
  }
}
export default add