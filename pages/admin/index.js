import React, { useEffect } from 'react'
import { AutoLogin } from '../../helpers/auto-login'
import { useUserContext } from '../../context/user'
import { Statistics } from '../../components/parts';
import fetch from '../../helpers/fetch-data';

function Dashboard({ dataUser, sales, clients, apartments, payments }) {

  const { setUser, setSales, setClients, setApartments, setPayments } = useUserContext();

  useEffect(() => {
    if (dataUser) {
      setUser(dataUser);
      setSales(sales);
      setClients(clients);
      setApartments(apartments);
      setPayments(payments);
    }
  }, []);

  return (
    <div>
      <Statistics />
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const token = ctx.req.cookies != undefined ? ctx.req.cookies.token : '';
  const response = await fetch('sales', 'get', {}, token);
  const apartments = await fetch('properties', 'get', {}, token);
  const payments = await fetch('payments', 'get', {}, token);
  const clients = await fetch('clients', 'get', {}, token);
  const data = await AutoLogin(ctx);
  return {
    props: {
      dataUser: data.dataUser,
      sales: response.data,
      clients: clients.data,
      apartments: apartments.data,
      payments: payments.data
    }
  }
}

export default Dashboard