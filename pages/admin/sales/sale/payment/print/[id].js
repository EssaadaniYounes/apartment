import Image from 'next/image';
import React from 'react'
import { AutoLogin } from '../../../../../../helpers/auto-login';
import fetch from '../../../../../../helpers/fetch-data';
function Print({ printData, dataUser }) {
  console.log(printData, dataUser);

  return (
    <div className='mx-auto'>
      <div className='mt-12 max-w-[21cm] mx-auto h-1/2 border-dashed border-2 py-6 px-[1cm]'>
        <div className='flex'>
          <Image src={'/images/logo.png'} width={80} height={80} priority />
          <div className='flex-1 text-center'>
            <h1 className='w-fit border-b-2 mx-auto font-bold'>{printData[0].name} <br /> {printData[0].city} </h1>
          </div>
        </div>
        {/* <h1 className="text-xl text-center font-semibold underline">
          Reçu pour N° : <span>{printData[0].num_payment}</span>
        </h1> */}
        <div className='text-center grid mt-4 grid-cols-1 md:grid-cols-2 gap-2'>
          <div>
            <span className="font-semibold">Client :</span> {printData[0].client_name}
          </div>
          <div>
            <span className="font-semibold">CIN :</span> {printData[0].cin}
          </div>
          <div>
            <span className="font-semibold">La Somme en chiffres :</span> {printData[0].amount} DH
          </div>
          <div>
            <span className="font-semibold">La Somme en letter :</span> {printData[0].cin}
          </div>
          <div>
            <span className="font-semibold">Objet :</span>
            {printData[0].type + "  "}
            {printData[0].num_apartment != 0 ? printData[0].num_apartment : ''}
            / {printData[0].city} / {printData[0].address}
          </div>
        </div>
        <div className='text-right mt-8'>
          {printData[0].city + ', Le :  ' + printData[0].payment_date}
        </div>
      </div>
      <button onClick={() => window.print()} className="not-print mt-8 relative block min-w-[20%] h-[45px] mx-auto sm:w-fit p-0.5 mb-2  overflow-hidden  font-medium text-md rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 text-blue-700 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
        <span className="relative  min-w-full flex items-center justify-center h-full sm:text-right  sm:w-fit  px-5 md:px-12 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
          </svg>
          <span>
            Imprimer
          </span>
        </span>
      </button>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  const { id } = ctx.params;
  const data = await fetch(`payment/print/${id}`, 'get', {}, ctx.req.cookies.token);
  const res = await AutoLogin(ctx);
  return {
    props: {
      printData: data.data,
      dataUser: res.dataUser,
    }
  }
}
export default Print