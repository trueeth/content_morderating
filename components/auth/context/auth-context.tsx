'use client'

import { createContext } from 'react'

import { LoginContextType } from '../types'


export const AuthContext = createContext({} as LoginContextType)
