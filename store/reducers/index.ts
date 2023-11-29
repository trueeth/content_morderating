import { combineReducers } from '@reduxjs/toolkit'
import { IDialogSlice } from './dialog/reducers'
import { IDrawerSlice } from './drawer/reducers'
import dialogReducer from './dialog/reducers'
import drawerReducer from './drawer/reducers'
import uploadReducers, { IUploadSlice } from './upload/reducers'
import snackbarReducers, { ISnackbarSlice } from './snackbar/reducers'
import paginationReducers, {
  IPaginationSlice
} from '@store/reducers/page/reducers'
import apiReducers, { IApiSlice } from '@store/reducers/api/reducers'

export interface IAppSlice {
  dialog: IDialogSlice
  drawer: IDrawerSlice
  upload: IUploadSlice
  snackbar: ISnackbarSlice
  pagination: IPaginationSlice
  api: IApiSlice
}

const appReducer = combineReducers({
  dialog: dialogReducer,
  drawer: drawerReducer,
  upload: uploadReducers,
  snackbar: snackbarReducers,
  pagination: paginationReducers,
  api: apiReducers
})

export default appReducer
