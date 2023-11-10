import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Layout from '../components/Layout'
import Providers from '../Providers'
import store from '../store/store'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiTabs: {
      defaultProps: {
        TabIndicatorProps: { style: { backgroundColor: 'var(--Primary1)' } },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: 'var(--Primary1)',
            borderRadius: '25px',
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'var(--Secondry-L)',
          },
          backgroundColor: 'var(--Secondry-L)',
          border: 'none',
          '&.Mui-selected, &.Mui-selected:hover': {
            color: 'white',
            backgroundColor: 'var(--Primary1)',
          },
        },
      },
    },
  },
})

function MyApp(props: AppProps<{ initialReduxState: any }>) {
  const { pageProps, Component } = props

  return (
    <Providers store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout title="Lending & Borrowing">
          <Component {...pageProps} />
        </Layout>{' '}
      </ThemeProvider>
    </Providers>
  )
}

export default MyApp
