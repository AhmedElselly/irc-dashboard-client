import { useEffect, Fragment } from 'react'
import Navbar from '../components/Navbar'
import Progress from '../components/Progress/Progress';
import {useRouter} from 'next/router';
import {useProgressStore} from '../store'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const setIsAnimating = useProgressStore(state => state.setIsAnimating);
  const isAnimating = useProgressStore(state => state.isAnimating);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true);
    }

    const handleStop = () => {
      setIsAnimating(false);
    }

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    }
  }, [router]);
  return (
    <Fragment>
      <Progress isAnimating={isAnimating} />

      <Navbar/>
      <Component {...pageProps} />
      
    </Fragment>
  )    
}

export default MyApp
