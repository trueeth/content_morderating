import '../public/styles/globals.css'
import type { AppProps } from 'next/app'

import Layout from '@components/layout/layout'
import Providers from '../Providers'
import index from '../store'
import { ThemeProvider, createTheme, ThemeOptions } from '@mui/material/styles'
import React, { ReactElement, ReactNode, useMemo } from 'react'
import { NextPage } from 'next'
import { AuthProvider } from '@components/auth/context/auth-provider'
import AuthGuard from '@components/auth/guard/auth-guard'
import themeOptions from '@interfaces/theme'
import '/locales/i18n'
import { useTranslation } from 'react-i18next'

import { LocalizationProvider, useLocales } from '../locales'


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp(props: AppPropsWithLayout) {
  const { pageProps, Component } = props

  const { currentLang } = useLocales();
  const { t } = useTranslation();

  const getLayout =
    Component.getLayout ??
    ((page) => (
      <AuthGuard>
        <Layout title={t('app_title')}>{page}</Layout>
      </AuthGuard>
    ))


  const theme=createTheme(themeOptions as ThemeOptions)

  const themeWithLocale = useMemo(
    () => createTheme
    (theme, currentLang.systemValue),
    [currentLang.systemValue, theme]
  );

  return (
    <LocalizationProvider>
      <Providers store={index}>
        <AuthProvider>
          <ThemeProvider theme={themeWithLocale}>
            {(() => getLayout(<Component {...pageProps} />))()}
          </ThemeProvider>
        </AuthProvider>
      </Providers>
    </LocalizationProvider>
  )
}

export default MyApp
