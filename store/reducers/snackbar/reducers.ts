import { createSlice } from '@reduxjs/toolkit'
import { EAlert } from '@interfaces/enums'

const initialState = {
  alertType: null,
  message: null,
  open: false,
  autoHideDuration:2000
}

export interface ISnackbarSlice {
  alertType: EAlert
  message?: string
  open: boolean,
  autoHideDuration:number,
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
      state.autoHideDuration=3000
      state.open = true
    },
    openSnackbarWarning(state, action) {
      state.alertType = EAlert.warning
      state.message = action.payload
      state.autoHideDuration=5000
      state.open = true
    },
    openSnackbarSuccess(state, action) {
      state.alertType = EAlert.success
      state.message = action.payload
      state.autoHideDuration=3000
      state.open = true
    },
    openSnackbarInfo(state, action) {
      state.alertType = EAlert.info
      state.message = action.payload
      state.autoHideDuration=3000
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
