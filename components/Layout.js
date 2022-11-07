import React from 'react'
import Navbar from './Navbar'
import { useEffect } from 'react'
import { useRouter } from 'next/router';
import nProgress from 'nprogress';
import Head from 'next/head';

export default function Layout({children, footer = true, dark = false}) {
  const router = useRouter();

  useEffect(() => {
      const handleRouteChange = url => { 
          console.log(url);
          nProgress.start();
        }

      router.events.on('routeChangeStart', handleRouteChange);
      router.events.on('routeChangeComplete', () => nProgress.done());

      return () => {
        router.events.off('routeChangeStart', handleRouteChange);
      }
  }, [])

  return (
    <div className={ dark ? 'bg-dark' : '' }>
     <Head>
        <title>StarTaildwind</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


        <Navbar />
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full space-y-8">
              {children}
          </div>
        </div>

        {
          footer && (
            <footer className="bg-dark text-light text-center">
              <div className="container p-4">
                  <h1>&copy; StarTaildwind</h1>
                  <p>2022 - {new Date().getFullYear()}</p>
                  <p>Marlon Falcón - All right Reserved</p>
              </div>  
            </footer>
          )
        } 
    </div>
  )
}