import { useState, useEffect, useCallback } from 'react'

import { useRouter } from 'next/router'

import { useAuthContext } from '../hooks'

// ----------------------------------------------------------------------

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
      router.replace('/auth')
    } else {
      setChecked(true)
    }
  }, [authenticated, router, router.pathname])

  useEffect(() => {
    check().catch(console.error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check, authenticated,router, router.pathname])


  if (!checked) {
    return null
  }

  return <>{children}</>
}
