import { Store } from '@reduxjs/toolkit'
import { ToastsProvider } from './context/ToastsContext'
import { Provider } from 'react-redux'

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
