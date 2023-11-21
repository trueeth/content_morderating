import { useEffect, useCallback } from 'react'

import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'

import { useAuthContext } from '../hooks'

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode
}

export default function GuestGuard({ children }: Props) {
  return <Container>{children}</Container>
}

// ----------------------------------------------------------------------

function Container({ children }: Props) {
  const router = useRouter()

  const searchParams = useSearchParams()

  const returnTo = searchParams.get('returnTo') || '/dashboard'

  const { authenticated } = useAuthContext()

  const check = useCallback(() => {
    if (authenticated) {
      router.replace(returnTo)
    }
  }, [authenticated, returnTo, router])

  useEffect(() => {
    check()
  }, [check])

  return <>{children}</>
}
