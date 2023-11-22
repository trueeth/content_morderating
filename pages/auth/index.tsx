import { Typography, Box, Button } from '@mui/material'
import { Container } from '@mui/system'
import { useAuthContext } from 'auth/hooks'
import { PrimaryTextField } from 'components/styled/TextField'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import LoginImg from 'assets/images/login.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


export default function Auth() {
  const { login } = useAuthContext()
  const router = useRouter()
  const [vState, setState] = useState({ username: '', pwd: '' })
  const handleUserInput = (key, value) => {
    setState({ ...vState, [key]: value })
  }

  const handleLogin = async () => {
    await login(vState.username, vState.pwd)
    router.push('/dashboard')
  }

  const {authenticated}=useAuthContext()

  useEffect(() => {
    if (authenticated){
      // console.log(router)
      router.replace("/dashboard")
    }
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        mt: 12
      }}
    >
      <Head>
        <title>VideoApp</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box
        sx={{
          width: { xs: '95%', md: '400px' },
          height: '500px',
          bgcolor: 'white',
          boxShadow: '1px 1px #eee',
          p: 3,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          '& .MuiTypography-root': {
            color: '#6c757ddf'
          }
        }}
      >
        <Image src={LoginImg} width={300} height={60} alt="login" />
        <Typography fontSize={16} color="#333" mt={5}>
          Sign In
        </Typography>
        <Typography
          sx={{ px: 4, mt: 2, fontSize: '13px', textAlign: 'center' }}
        >
          Enter your email address and password to access admin panel
        </Typography>
        <Box sx={{ mt: 4, width: '80%' }}>
          <Typography fontSize={14} mb={1}>
            Username
          </Typography>
          <PrimaryTextField
            placeholder="Enter your username"
            onChange={(e) => handleUserInput('username', e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: '#fff',
                boxShadow: 'none',
                border: 'none'
              }
            }}
          />
        </Box>
        <Box sx={{ mt: 3, width: '80%' }}>
          <Box mb={1} display="flex" justifyContent="space-between">
            <Typography fontSize={14}>Password</Typography>
            <Typography fontSize={12}>Forgot password?</Typography>
          </Box>
          <PrimaryTextField
            placeholder="Enter your password"
            onChange={(e) => handleUserInput('pwd', e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: '#fff',
                boxShadow: 'none',
                border: 'none'
              }
            }}
          />
        </Box>
        <Button
          onClick={handleLogin}
          sx={{
            bgcolor: '#536de6',
            color: 'white',
            px: 3,
            mt: 3,
            '&:hover': { bgcolor: '#536de6' }
          }}
        >
          Log In
        </Button>
      </Box>
    </Box>
  )
}

Auth.getLayout = function getLayout(page) {
  return <Container>{page}</Container>
}
