import React, { ReactNode } from 'react'
import Head from 'next/head'
import Header from './Header'
import UploadDialog from './dialog/UploadDialog'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {

  return (

    <div className={'pb-50 flex flex-col justify-center item-center'}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className={'w-full'}>
        <Header />
      </header>
      <UploadDialog/>
      {children}
    </div>
  )
}

export default Layout
