import {  createSlice } from '@reduxjs/toolkit'


const initialState = {
  videoUpload: false,
}

export interface IDialogSlice {
  videoUpload: boolean
}

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openVideoUploadDialog(state,action) {
      state.videoUpload = action.payload.open
    }
  },
})


export default dialogSlice.reducer

export const {  openVideoUploadDialog} = dialogSlice.actions

