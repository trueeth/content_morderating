import { createSlice } from '@reduxjs/toolkit'
import { TResVideo } from '@interfaces/apis/videos.types'

const initialState = {
  data: null,
  loading: false,
  error: ''
}

export interface IApiSlice {
  data?: TResVideo.getMediaContents | TResVideo.apiGetVideoScenes | Object,
  loading?: boolean,
  error?: string,
}

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setApiLoading(state, action) {
      state.loading = action.payload
    },
    setApiData(state, action) {
      state.data = action.payload
      state.loading=false
    },
    setApiError(state, action) {
      state.error = action.payload.error
    }
  }
})

export default apiSlice.reducer
export const {
  setApiLoading,
  setApiData,
  setApiError
} = apiSlice.actions
