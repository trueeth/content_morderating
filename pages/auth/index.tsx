'use client'
import * as React from 'react'
import AuthSection from '@sections/auth'
import { Container } from '@mui/system'

const Auth = () => {
 return <AuthSection />
}



export default Auth

Auth.getLayout = function getLayout(page) {
 return <Container>{page}</Container>
}


