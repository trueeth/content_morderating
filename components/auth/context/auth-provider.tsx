'use client'

import React, { useMemo, useReducer, useCallback, useEffect } from 'react'

import { AuthContext } from './auth-context'
import { AuthUserType, ActionMapType, AuthStateType } from '../types'

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT'
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType
    auth: string
  }
  [Types.LOGIN]: {
    user: AuthUserType
    auth: string
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
  loading: true,
  auth: 'auth'
}

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
      auth: action.payload.auth
    }
  }
  if (action.type === Types.LOGIN) {
    localStorage.setItem('auth', 'auth')
    return {
      ...state,
      user: action.payload.user,
      auth: action.payload.auth
    }
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user
    }
  }
  if (action.type === Types.LOGOUT) {
    localStorage.clear()
    return {
      ...state,
      user: null,
      auth: null
    }
  }
  return state
}

type Props = {
  children: React.ReactNode
}

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const login = useCallback(async (email: string, password: string) => {
    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          email,
          password
        },
        auth: 'auth'
      }
    })
  }, [])

  const logout = useCallback(async () => {
    dispatch({
      type: Types.LOGOUT
    })
  }, [])

  const initialize = useCallback(async () => {
    const auth = localStorage.getItem('auth')

    dispatch({
      type: Types.INITIAL,
      payload: {
        user: {},
        auth: auth
      }
    })
  }, [])

  useEffect(() => {
    initialize()
  }, [initialize])

  // ----------------------------------------------------------------------

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      authenticated: state.auth === 'auth',
      unauthenticated: state.auth !== 'auth',
      login,
      logout
    }),
    [login, logout, state.user, state.auth]
  )

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  )
}
