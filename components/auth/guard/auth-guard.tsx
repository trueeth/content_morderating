import React, { useState, useEffect, useCallback } from 'react'

import { useRouter } from 'next/router'
import { useAuthContext } from '@components/auth/hooks/use-auth-context'


// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode
}

export default function AuthGuard({ children }: Props) {
  return <Container>{children}</Container>
}

// ----------------------------------------------------------------------

function Container({ children }: Props) {
  const router = useRouter()

  const { authenticated } = useAuthContext()

  const [checked, setChecked] = useState(false)

  const check = useCallback(async () => {
    if (!authenticated) {
      setChecked(false)
      await router.push('/auth')
    } else {
      setChecked(true)
      if (router.pathname == '/') await router.push('/dashboard')
    }
  }, [authenticated, router])

  useEffect(() => {
    check().catch(console.error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check, authenticated, router])

  if (!checked) {
    return null
  }

  return <>{children}</>
}
