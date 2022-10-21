import React, { useState } from 'react'
import { useUserContext } from '../../context/user';
import fetch from '../../helpers/fetch-data';
import Form from './Form';
import { useRouter } from 'next/router';

function ProjectPayment({ payment = null }) {
  const { clients, lodgings } = useUserContext();
  const router = useRouter();
  const [data, setData] = useState(payment ? payment : {
    lodging_id: '',
    client_id: '',
    num_lot: '',
    price: '',
    advanced_amount: '',
    next_payment: ''
  })
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  }
  const handleSubmit = async () => {
    if (payment) {
      console.log("Theress")
    }
    else {
      const res = await fetch('project_payments', 'POST', data, localStorage.getItem('token'));
    }
    router.push('/admin/lodgings/' + data.lodging_id);
  }
  return (
    <Form>

      <div className="flex flex-col gap-y-4">
        <div className="items-container">
          <div className="input-container">
            <label htmlFor="" className='label'>Projet</label>
            <select className='input-rounded' name='lodging_id' value={data.lodging_id} onChange={(e) => handleChange(e)}>
              {lodgings.map(lodging => <option value={lodging.value} key={lodging.value}>{lodging.label}</option>)}
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="" className='label'>Client</label>
            <select className='input-rounded' name='client_id' value={data.client_id} onChange={(e) => handleChange(e)}>
              {clients.map(client => <option value={client.value} key={client.value}>{client.label}</option>)}
            </select>
          </div>
        </div>
        <div className="items-container">
          <div className="input-container">
            <label htmlFor="" className='label'>Prix de vente</label>
            <input type="text" className='input-rounded' name="price" onChange={(e) => handleChange(e)} value={data.price} />
          </div>
          <div className="input-container">
            <label htmlFor="" className='label'>N° lot</label>
            <input type="text" className='input-rounded' name="num_lot" onChange={(e) => handleChange(e)} value={data.num_lot} />
          </div>
        </div>
        <div className="items-container">
          <div className="input-container">
            <label htmlFor="" className='label'>Echiance</label>
            <input type="date" className='input-rounded' name="next_payment" onChange={(e) => handleChange(e)} value={data.next_payment} />
          </div>
          <div className="input-container">
            <label htmlFor="" className='label'>Avance</label>
            <input type="text" className='input-rounded' name="advanced_amount" onChange={(e) => handleChange(e)} value={data.advanced_amount} />
          </div>
        </div>
        <button onClick={() => handleSubmit()} className={`${payment ? 'yellow-button' : 'button-save'} max-w-[180px] flex items-center mx-auto`}>
          Add
        </button>
      </div>
    </Form >
  )
}

export default ProjectPayment