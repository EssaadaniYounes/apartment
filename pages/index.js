import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { AutoLogin } from '../helpers/auto-login';
import { useUserContext } from '../context/user';

const Home = ({ dataUser }) => {
  const router = useRouter();
  const { setUser } = useUserContext();
  useEffect(() => {
    if (dataUser) {
      setUser(dataUser);
      return router.push('/admin');
    }
    router.push('/auth');
  }, [])

  return (

    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const res = await AutoLogin(ctx);
  
  return {
    props: {
      dataUser: res.dataUser,
    }
  }
}

export default Home
