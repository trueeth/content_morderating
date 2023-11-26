import { PopupLoginOptions, RedirectLoginOptions } from '@auth0/auth0-react'

// ----------------------------------------------------------------------

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export type AuthUserType = null | Record<string, any>

export type AuthStateType = {
  status?: string
  loading: boolean
  user: AuthUserType
  auth:string
}

// ----------------------------------------------------------------------

type CanRemove = {
  login?: (email: string, password: string) => Promise<void>
  register?: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>
  //
  loginWithGoogle?: () => Promise<void>
  loginWithGithub?: () => Promise<void>
  loginWithTwitter?: () => Promise<void>
  //
  loginWithPopup?: (options?: PopupLoginOptions) => Promise<void>
  loginWithRedirect?: (options?: RedirectLoginOptions) => Promise<void>
  //
  confirmRegister?: (email: string, code: string) => Promise<void>
  forgotPassword?: (email: string) => Promise<void>
  resendCodeRegister?: (email: string) => Promise<void>
  newPassword?: (email: string, code: string, password: string) => Promise<void>
}

export type LoginContextType = CanRemove & {
  user: AuthUserType
  authenticated: boolean
  unauthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}
