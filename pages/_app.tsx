import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Layout from '../components/Layout'
import Providers from '../Providers'
import index from '../store'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

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
    }
  }
})

function MyApp(props: AppProps<{ initialReduxState: any }>) {
  const { pageProps, Component } = props

  const router = useRouter()


  useEffect(()=>{
    router.push('/dashboard')
  },[])

  return (
    <Providers store={index}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout title="VideoApp">
          <Component {...pageProps} />
        </Layout>{' '}
      </ThemeProvider>
    </Providers>
  )
}

export default MyApp
