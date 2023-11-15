import { combineReducers, createSelector, createSlice } from '@reduxjs/toolkit'
import { IReduxState } from 'store/index'
import { IDialogSlice } from './dialog.reducers'
import { IDrawerSlice } from './drawer.reducers'
import dialogReducer from './dialog.reducers'
import drawerReducer from './drawer.reducers'


export interface IAppSlice {
  dialog:IDialogSlice,
  drawer:IDrawerSlice
}

const appReducer=combineReducers({dialog:dialogReducer, drawer:drawerReducer})


export default appReducer

