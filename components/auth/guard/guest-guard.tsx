import React, { useEffect, useCallback } from 'react'

import { useSearchParams, useRouter } from 'next/navigation'
import { useAuthContext } from '@components/auth/hooks/use-auth-context'



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

  const returnTo = searchParams.get('returnTo') || '/videos'

  const { authenticated } = useAuthContext()

  const check = useCallback(() => {
    if (authenticated) {
      router.push(returnTo)
    }
  }, [authenticated, returnTo, router])

  useEffect(() => {
    check()
  }, [check])

  return <>{children}</>
}
