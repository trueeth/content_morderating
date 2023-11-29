import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  progress: 0,
  remaining: 0
}

export interface IUploadSlice {
  progress: number
  remaining: number
}

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setUploadProgress(state, action) {
      state.progress = action.payload.progress
      state.remaining = action.payload.remaining
    }
  }
})

export default uploadSlice.reducer

export const { setUploadProgress } = uploadSlice.actions
