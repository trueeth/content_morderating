import { createSlice } from '@reduxjs/toolkit'
import { TResDocument, TResVideo } from '@interfaces/apis/api.types'

const initialState = {
  data: [],
  loading: false,
  error: '',
  refresh:false,
}

export interface IApiSlice {
  data?: TResVideo.TVideoContent[]  | TResDocument.TDocumentContent [] | [],
  loading?: boolean,
  error?: string,
  refresh:boolean,
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
    },
    setRefresh(state,action){
      if (action.payload!==undefined)
        state.refresh=action.payload
      else state.refresh=true
    }
  }
})

export default apiSlice.reducer
export const {
  setApiLoading,
  setApiData,
  setApiError,
  setRefresh,
} = apiSlice.actions
