import { Store } from '@reduxjs/toolkit'
import { ToastsProvider } from '@context/toast-context'
import { Provider } from 'react-redux'
import React from 'react'

const Providers: React.FC<
  React.PropsWithChildren<{ store: Store; children: React.ReactNode }>
> = ({ children, store }) => {
  return (
    <Provider store={store}>
      <ToastsProvider>{children}</ToastsProvider>
    </Provider>
  )
}

export default Providers
