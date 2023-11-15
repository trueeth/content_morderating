'use client'

import * as React from 'react'
import { Container } from '@mui/material'

const Index = () => {
  return (
    <>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: 'white',
          width: '100%',
          fontFamily: 'Rubik',
          overflow: 'auto',
          paddingLeft: '0 !important',
          paddingRight: '0 !important',
        }}
      ></Container>
    </>
  )
}

export default Index
