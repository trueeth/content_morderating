import { createSlice } from '@reduxjs/toolkit'
import { TResVideo } from '@interfaces/apis/api.types'

const initialState = {
  data: [],
  loading: false,
  error: ''
}

export interface IApiSlice {
  data?: TResVideo.TVideoContent[]  | [],
  loading?: boolean,
  error?: string,
}

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setApiLoading(state, action) {
      state.loading = action.payload
      if (action.payload==true)
        state.data=[]
    },
    setApiData(state, action) {
      state.data = action.payload
      state.loading=false
    },
    setApiError(state, action) {
      state.loading=false
      state.data=[]
      state.error = action.payload
    }
  }
})

export default apiSlice.reducer
export const {
  setApiLoading,
  setApiData,
  setApiError
} = apiSlice.actions
