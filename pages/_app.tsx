import '../public/styles/globals.css'
import type { AppProps } from 'next/app'

import Layout from '@components/layout/Layout'
import Providers from '../Providers'
import index from '../store'
import { ThemeProvider } from '@mui/material/styles'
import React, { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { AuthProvider } from '@components/auth/context/auth-provider'
import AuthGuard from '@components/auth/guard/auth-guard'
import theme from '@interfaces/theme'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp(props: AppPropsWithLayout) {
  const { pageProps, Component } = props

  const getLayout =
    Component.getLayout ??
    ((page) => (
      <AuthGuard>
        <Layout title="VideoApp">{page}</Layout>
      </AuthGuard>
    ))

  return (
    <Providers store={index}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          {(() => getLayout(<Component {...pageProps} />))()}
        </ThemeProvider>
      </AuthProvider>
    </Providers>
  )
}

export default MyApp
