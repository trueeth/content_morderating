import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { IReduxState } from 'store/store'
import { setAll } from 'utils/setAll'

export const loadAppDetails = createAsyncThunk(
  'app/loadAppDetails',
  async () => {}
)

const initialState = {
  loading: true,
  videoDrawerOpen: false,
  orders: [],
}

export interface IAppSlice {
  loading: boolean
  videoDrawerOpen: boolean
  orders: Array<string>
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    fetchAppSuccess(state, action) {
      setAll(state, action.payload)
    },
    openVideoDrawer(state, action) {
      state.videoDrawerOpen = action.payload.open
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAppDetails.pending, (state, action) => {
        state.loading = true
      })
      .addCase(loadAppDetails.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(loadAppDetails.rejected, (state, { error }) => {
        state.loading = false
        console.log(error)
      })
  },
})

const baseInfo = (state: IReduxState) => state.app

export default appSlice.reducer

export const { fetchAppSuccess, openVideoDrawer } = appSlice.actions

export const getAppState = createSelector(baseInfo, (app) => app)
