import React, { useState } from 'react'
import { useUserContext } from '../../context/user';
import fetch from '../../helpers/fetch-data'

function ProjectItem({ project_id, setState, item = null }) {
    const { projectPaymentItems, setProjectPaymentItems, projectPayments, setProjectPayments } = useUserContext();
    const [data, setData] = useState(item ? item : {
        project_payment_id: project_id,
        amount: 0,
        next_payment: ''
    })

    const handleOnSubmit = async () => {
        if (!item) {
            const res = await fetch('project_payment_items', 'post', data, localStorage.getItem('token'));
            if (res.data.success) {
                setProjectPaymentItems([...projectPaymentItems, res.data]);
                const newPayments = projectPayments.map(p => {
                    if (p.id == project_id) {
                        const paid = +p.paid + +data.amount;
                        const total = paid + +p.advanced_amount;
                        const rest = p.price - total
                        return {
                            ...p,
                            paid,
                            total,
                            rest
                        }
                    }
                    return p;
                })
                setProjectPayments(newPayments);
            }
            setState(false);
        }
    }

    return (
        <div className='w-full h-screen inset-0 bg-gray-100 bg-opacity-40 backdrop-blur-sm  absolute top-0 z-10 flex items-center justify-center'>
            <div className="w-[300px] rounded-md shadow-md">
                <div className="bg-gray-600 p-2 capitalize text-white font-semibold rounded-t-md flex items-center justify-between ">
                    <div>Ajouter paiment</div>
                    <div className="mx-2 bg-white px-3 py-1 text-gray-800 rounded-full font-bold cursor-pointer duration-100 hover:bg-gray-100" onClick={() => setState(false)} >x</div>
                </div>
                <div className="form-content bg-white rounded-b-md">
                    <div className="input-container mb-2">
                        <label className='label'>Montant</label>
                        <input type="text"
                            className='input-rounded'
                            value={data.amount}
                            onChange={(e) => setData({ ...data, amount: e.target.value })}
                            placeholder=" " />
                    </div>
                    <div className="input-container mb-2">
                        <label className='label'>Echiance</label>
                        <input type="date"
                            className='input-rounded'
                            value={data.next_payment}
                            onChange={(e) => setData({ ...data, next_payment: e.target.value })}
                            placeholder=" " />
                    </div>
                    <button onClick={() => handleOnSubmit()} className={`${!false ? 'button-save' : 'yellow-button'} max-w-[120px] flex items-center mx-auto`}>
                        <div className='ml-1'>Sauvgarder</div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProjectItem