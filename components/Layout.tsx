import React, { ReactNode, useEffect, useState } from 'react'
import Head from 'next/head'
import Header from './Header'
import UploadDialog from './dialog/uploadDialog/UploadDialog'
import { Alert, Container, Snackbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from '../store'
import { IAppSlice } from '../store/reducers'
import { closeSnackbar } from '../store/reducers/snackbar.reducers'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const dispatch = useDispatch()

  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway' || reason === undefined) {
      return
    }
    if (appState.snackbar.open) dispatch(closeSnackbar())
  }

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

      <Snackbar
        open={appState.snackbar.open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={appState.snackbar.alertType} sx={{ width: '100%' }}>
          {appState.snackbar.message}
        </Alert>
      </Snackbar>

      <Container
        sx={{
          mt: '100px',
          width: '100%',
          maxWidth: '1500px !important',
          overflow: 'auto'
        }}
      >
        {children}
      </Container>
    </div>
  )
}

export default Layout
