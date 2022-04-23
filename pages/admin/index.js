import React, { useEffect } from 'react'
import { AutoLogin } from '../../helpers/auto-login'
import { useUserContext } from '../../context/user'

function Dashboard({ dataUser }) {

  const { setUser } = useUserContext();

  useEffect(() => {
    if (dataUser) {
      setUser(dataUser);
    }
  }, []);

  return (
    <div>Dashboard</div>
  )
}

Dashboard.getInitialProps = async (ctx) => {
  return AutoLogin(ctx);
}

export default Dashboard