import { createSlice } from '@reduxjs/toolkit'
import { EAlert } from '../../interfaces'

const initialState = {
  alertType: null,
  message: null,
  open: false
}

export interface ISnackbarSlice {
  alertType: EAlert
  message?: string
  open: boolean
}

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar(state, action) {
      state.alertType = action.payload.alertType
      state.message = action.payload.message
      state.open = action.payload.open
    },
    openSnackbarError(state, action) {
      state.alertType = EAlert.error
      state.message = action.payload
      state.open = true
    },
    openSnackbarWarning(state, action) {
      state.alertType = EAlert.warning
      state.message = action.payload
      state.open = true
    },
    openSnackbarSuccess(state, action) {
      state.alertType = EAlert.success
      state.message = action.payload
      state.open = true
    },
    openSnackbarInfo(state, action) {
      state.alertType = EAlert.info
      state.message = action.payload
      state.open = true
    },
    closeSnackbar(state) {
      state.open = false
    }
  }
})

export default snackbarSlice.reducer

export const {
  openSnackbar,
  openSnackbarError,
  openSnackbarWarning,
  openSnackbarInfo,
  openSnackbarSuccess,
  closeSnackbar
} = snackbarSlice.actions