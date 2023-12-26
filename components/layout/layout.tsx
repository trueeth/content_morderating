import React, { ReactNode, useEffect } from 'react'
import Head from 'next/head'
import UploadDialog from '../dialog/upload-dlg'
import { Alert, Container, Snackbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'
import { closeSnackbar } from '@store/reducers/snackbar/reducers'
import Box from '@mui/material/Box'
import LoadingIcons from 'react-loading-icons'
import clsx from 'clsx'
import { setLang } from '@store/reducers/setting/reducers'
import Header from './header'


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

  useEffect(() => {
    const currentLang = localStorage.getItem('i18nextLng')
    dispatch(setLang(currentLang))
    if (currentLang === 'ar')
      document.dir = 'rtl'
  }, [dispatch])

  return (
    <div
      className={clsx('pb-50 flex flex-col justify-center item-center')}>
      <Head>
        <title>{title}</title>
        <link rel='icon' href='/assets/images/favicon.ico' sizes='any' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link href='https://amp.azure.net/libs/amp/2.3.6/skins/amp-default/azuremediaplayer.min.css' rel='stylesheet' />
        <script src='https://amp.azure.net/libs/amp/2.3.6/azuremediaplayer.min.js' async></script>
      </Head>
      <header className={'w-full'}>
        <Header />
      </header>
      <UploadDialog />

      <Snackbar
        open={appState.snackbar.open}
        autoHideDuration={appState.snackbar.autoHideDuration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={appState.snackbar.alertType} sx={{ width: '100%' }}>
          {appState.snackbar.message}
        </Alert>
      </Snackbar>

      <Box
        sx={{
          position: 'fixed',
          zIndex: 1500,
          width: '100%',
          top: '40%',
          bottom: '30%',
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          ...(!appState.api.loading && {
            display: 'none'
          })
        }}
      >
        <Box sx={{
          '& g': {
            stroke: 'var(--Primary1)'
          },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'var(--Primary1)',
          flexDirection: 'column'
        }}>
          <LoadingIcons.Puff height={80} width={80} strokeWidth={3} />
        </Box>
      </Box>
      <Container
        sx={{
          mt: '100px',
          width: '100%',
          maxWidth: '1500px !important',
          overflow: 'auto',
          opacity: '1',
          ...(appState.api.loading && {
            opacity: '.6'
          })
        }}
      >
        {children}
      </Container>

    </div>
  )
}

export default Layout
