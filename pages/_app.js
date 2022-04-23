import '../styles/globals.css'
import { AppProps } from 'next/app'
import { Container } from '../components/layouts';
import  UserWrapper  from '../context/user';

function MyApp({ Component, pageProps }) {
  return (
    <UserWrapper>
      <Container>
        <Component {...pageProps} />
      </Container>
    </UserWrapper>
  )
}

export default MyApp
