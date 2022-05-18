import React from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'

function BarChartComponent({ data }) {
    return (
        <div className='shadow-md bg-blue-50 mt-3 mx-auto rounded-md w-full md:w-[500px] overflow-y-hidden'>
            <h1 className='p-4 bg-blue-300 text-xs md:text-sm font-semibold text-white min-w-full'>Nombre Propriétés soldé et disponible par ville</h1>
            <div className="mt-12 mx-auto pb-12 w-full md:min-w-[500px] overflow-x-auto">
                <BarChart width={450} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey='city' tick={{ fontSize: '14px' }} />
                    <YAxis />
                    <Legend />
                    <Tooltip />
                    <Bar name='Disponible' dataKey="free" fill="#8884d8" />
                    <Bar name='Soldé' dataKey="sold" fill="#82ca9d" />
                </BarChart>
            </div>
        </div>
    )
}

export default BarChartComponent