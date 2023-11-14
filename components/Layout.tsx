import React, { ReactNode } from 'react'
import Head from 'next/head'
import Header from './Header'
import UploadDialog from './dialog/uploadDialog/UploadDialog'
import { Container } from '@mui/material'

type Props = {
  children?: ReactNode
  title?: string
}

const Favicon = () => (
  <>
    <link rel="icon" href="/assets/images/favicon.ico" />
  </>
)

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  return (
    <div className={'pb-50 flex flex-col justify-center item-center'}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/*<meta charSet="utf-8" />*/}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className={'w-full'}>
        <Header />
      </header>
      <UploadDialog />
      <Container
        sx={{
          mt: '100px',
          width: '100%',
          maxWidth: '1400px !important',
          overflow: 'auto',
        }}
      >
        {children}
      </Container>
    </div>
  )
}

export default Layout
