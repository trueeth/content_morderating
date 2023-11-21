import { Typography, Box, Button } from '@mui/material'
import { Container } from '@mui/system'
import { useAuthContext } from 'auth/hooks'
import { PrimaryTextField } from 'components/styled/TextField'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

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

  return (
    <Box>
      <Head>
        <title>VideoApp</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/*<meta charSet="utf-8" />*/}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box>
        <Typography>Username</Typography>
        <PrimaryTextField
          onChange={(e) => handleUserInput('username', e.target.value)}
        />
        <Typography>Password</Typography>
        <PrimaryTextField
          onChange={(e) => handleUserInput('pwd', e.target.value)}
        />
        <Button onClick={handleLogin}>Log In</Button>
      </Box>
    </Box>
  )
}

Auth.getLayout = function getLayout(page) {
  return <Container>{page}</Container>
}
