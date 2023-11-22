import { combineReducers, createSelector, createSlice } from '@reduxjs/toolkit'
import { IReduxState } from 'store/index'
import { IDialogSlice } from './dialog.reducers'
import { IDrawerSlice } from './drawer.reducers'
import dialogReducer from './dialog.reducers'
import drawerReducer from './drawer.reducers'
import uploadReducers, { IUploadSlice } from './upload.reducers'
import snackbarReducers, { ISnackbarSlice } from './snackbar.reducers'


export interface IAppSlice {
  dialog:IDialogSlice,
  drawer:IDrawerSlice,
  upload:IUploadSlice,
  snackbar:ISnackbarSlice,
}

const appReducer=combineReducers({
  dialog:dialogReducer,
  drawer:drawerReducer,
  upload:uploadReducers,
  snackbar:snackbarReducers,
})


export default appReducer

