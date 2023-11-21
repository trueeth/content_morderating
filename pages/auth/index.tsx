import { Typography, Box } from '@mui/material'
import { Container } from '@mui/system'
import { PrimaryTextField } from 'components/styled/TextField'
import React from 'react'

export default function Auth() {
  return (
    <Box>
      <Typography>Username</Typography>
      <PrimaryTextField />
      <Typography>Password</Typography>
      <PrimaryTextField />
    </Box>
  )
}

Auth.getLayout = function getLayout(page) {
  return <Container>{page}</Container>
}
