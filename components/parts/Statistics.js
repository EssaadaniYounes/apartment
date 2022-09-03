import React, { useEffect, useState } from 'react';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useUserContext } from '../../context/user';
import groupData from '../../helpers/group-data';
import calcBought from '../../helpers/calc-boughts';
import calcPayments from '../../helpers/calc-payments';
import groupByCity from '../../helpers/group-by-city';
import { BarChart } from '.';



const Statistics = () => {
    const { sales, clients, apartments, payments } = useUserContext();
    const [data, setData] = useState(null);
    const [groupedData, setGroupedData] = useState(null);
    useEffect(() => {
        setData(groupData(sales));
        setGroupedData(groupByCity(apartments));
    }, [sales]);
    return (
        data &&
        <div className='m-4'>
            <div className='flex justify-between flex-wrap gap-y-4'>
                <ClientsBox clients={clients} />
                <ApartmentsBox apartments={apartments} />
                <ApartmentsBoughts apartments={apartments} />
                <PaymentsBox payments={payments} />
            </div>
            <div className='flex items-center justify-between flex-wrap'>
                <div className='w-full md:w-[500px] mx-auto flex flex-col items-center mt-4 relative rounded-md shadow-md md:overflow-hidden bg-blue-50'>
                    <h1 className='p-4 rounded-t-lg bg-blue-300 text-xs md:text-sm font-semibold w-full text-white'>Nombre Propriétés achetés cette année par mois</h1>
                    <div className='mt-12 mx-auto w-full md:min-w-[500px] overflow-x-auto'>
                        <LineChart width={450} height={300} data={data} margin={{ right: 30, top: 10, bottom: 10, left: -15 }} >
                            <Legend verticalAlign="top" height={36} />
                            <Line type="monotone" name='Nombre de ventes' dataKey="count" stroke="#8884d8" />
                            <CartesianGrid stroke="#3ff2cc" strokeDasharray="5 5" />
                            <XAxis dataKey="month" margin={{ right: 20 }} interval={'preserveStartEnd'} tick={{ fontSize: '14px', maxWidth: '20px', wordWrap: 'break-word' }} />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </div>
                </div>
                {groupedData && <BarChart data={groupedData} />}
            </div>
        </div>
    )
};
const ClientsBox = ({ clients }) => {
    return (
        <div className='w-full sm:w-[240px] h-20 flex items-center justify-between px-4 bg-orange-400 rounded-md shadow-sm p-2'>
            <h1 className='flex items-center text-sm md:text-base lg:text-lg font-semibold text-white'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Clients
            </h1>
            <p className='text-xl font-bold text-gray-800'>
                {clients.length}
            </p>
        </div>
    )
}
const ApartmentsBox = ({ apartments }) => {
    return (
        <div className='w-full sm:w-[240px] h-20 flex  items-center justify-between px-4 bg-blue-400 rounded-md shadow-sm p-2'>
            <h1 className='flex items-center text-sm md:text-base lg:text-lg font-semibold text-white'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Propriété
            </h1>
            <p className='text-xl font-bold text-gray-800'>
                {apartments.length}
            </p>
        </div>
    )
}
const ApartmentsBoughts = ({ apartments }) => {
    const width = calcBought(apartments) / apartments.length * 100;
    return (
        <div className='w-full sm:w-[240px] h-20  px-4 bg-orange-500 rounded-md shadow-sm p-2'>
            <div className='flex  items-center justify-between'>

                <h1 className='flex items-center text-xs lg:text-[14px] font-semibold text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Nombre de biens vendus
                </h1>
                <p className='text-lg font-bold text-gray-800'>
                    {
                        calcBought(apartments)
                    }
                    <span className='text-xs'>{`(${isNaN(width) ? 0 : width.toFixed(2)}%)`}</span>
                </p>
            </div>
            <p className='w-full h-3 rounded-lg mt-2 bg-gray-300 relative'>
                <span className='test h-3 rounded-lg bg-yellow-400 absolute' style={{ 'width': width + '%' }}></span>
            </p>
        </div >
    )
}
const PaymentsBox = ({ payments }) => {
    return (
        <div className='w-full sm:w-[240px] flex items-center justify-between h-20 px-4 bg-green-500 rounded-md shadow-sm p-2'>


            <h1 className='flex items-center text-sm md:text-base lg:text-lg font-semibold text-white'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Paiments ce mois
            </h1>
            <p className='text-lg font-bold text-gray-800'>
                {
                    calcPayments(payments)
                }
            </p>
        </div >
    )
}
export default Statistics