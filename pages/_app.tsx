import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Layout from '../components/Layout'
import Providers from '../Providers'
import index from '../store'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import React, { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { AuthProvider } from 'auth/context/auth-provider'
import AuthGuard from 'auth/guard/auth-guard'

const theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiTabs: {
      defaultProps: {
        TabIndicatorProps: { style: { backgroundColor: 'var(--Primary1)' } }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: 'var(--Primary1)',
            borderRadius: '25px'
          }
        }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'var(--Secondry-L)'
          },
          backgroundColor: 'var(--Secondry-L)',
          border: 'none',
          '&.Mui-selected, &.Mui-selected:hover': {
            color: 'white',
            backgroundColor: 'var(--Primary1)'
          }
        }
      }
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: 'var(--Primary1)',
          '&.Mui-checked': {
            color: 'var(--Primary1)'
          }
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true
      }
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: 'separate',
          borderSpacing: '0 0.5rem'
        }
      }
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& .MuiTableRow-root': {
            '& > .MuiTableCell-root': {
              textAlign: 'left',
              borderTop: '1px solid #ccc',
              borderBottom: '1px solid #ccc',
              '&:first-of-type': {
                borderLeft: '1px solid #ccc',
                borderTopLeftRadius: '10px',
                borderBottomLeftRadius: '10px'
              },
              '&:last-of-type': {
                borderRight: '1px solid #ccc',
                borderTopRightRadius: '10px',
                borderBottomRightRadius: '10px'
              }
            }
          }
        }
      }
    },
    MuiSelect: {
      defaultProps: {
        fullWidth: true,
        displayEmpty: true
      },
      styleOverrides: {
        root: {
          height: '40px',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--Primary1)'
          }
        }
      }
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          marginBottom: '10px',
          backgroundColor: 'transparent',
          color: 'grey',
          border: '1px solid #eee',
          '&.Mui-selected': {
            backgroundColor: 'var(--Primary1)',
            color: '#fff',
            border: 'none',
            '&:hover': {
              backgroundColor: 'var(--Primary1)',
              color: '#fff',
              border: 'none'
            }
          }
        }
      }
    }
  }
})

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
