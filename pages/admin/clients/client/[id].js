import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Client } from '../../../../components/parts';
import { useUserContext } from '../../../../context/user';
import { AutoLogin } from '../../../../helpers/auto-login';
import fetch from '../../../../helpers/fetch-data';

function EditClient({ dataUser, client }) {
  const { setUser } = useUserContext();
  const router = useRouter();
  useEffect(() => {
    if (dataUser) {
      setUser(dataUser);
    }
    if (!client) {
      router.push('/admin/clients/add');
    }
  }, []);

  return (
    <div className='p-8'>
      <span className='text-xl pb-1 font-semibold text-gray-600 block border-b'>
        Modifier un client
      </span>
      <Client client={client} />
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const response = await AutoLogin(ctx);
  const { id } = ctx.params;
  const client = await fetch(`clients/${id}`, 'get', {}, ctx.req.cookies.token);
  return {
    props: {
      dataUser: response.dataUser,
      client: client.data
    }
  }
}


export default EditClient