import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'

import appReducer from './reducers'

import { useDispatch } from 'react-redux'
import { IAppSlice } from './reducers'

export interface IReduxState {
  app: IAppSlice
}

const index = configureStore({
  reducer: {
    // account: accountReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunkMiddleware),
})

export type RootState = ReturnType<typeof index.getState>
export type AppDispatch = typeof index.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default index
