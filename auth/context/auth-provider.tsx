'use client'

import { useMemo, useReducer, useCallback } from 'react'

import { AuthContext } from './auth-context'
import { AuthUserType, ActionMapType, AuthStateType } from '../types'
import { stat } from 'fs'

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT'
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType
  }
  [Types.LOGIN]: {
    user: AuthUserType
  }
  [Types.REGISTER]: {
    user: AuthUserType
  }
  [Types.LOGOUT]: undefined
}

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>]

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true
}

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user
    }
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user
    }
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user
    }
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null
    }
  }
  return state
}

type Props = {
  children: React.ReactNode
}

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          email,
          password
        }
      }
    })
  }, [])

  // LOGOUT
  const logout = useCallback(async () => {
    dispatch({
      type: Types.LOGOUT
    })
  }, [])

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated'

  const status = checkAuthenticated

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      login,
      logout
    }),
    [login, logout, state.user, status]
  )

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  )
}
