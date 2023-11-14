import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { IReduxState } from 'store/store'
import { setAll } from 'utils/setAll'


const initialState = {
  loading: true,
  videoDrawerOpen: false,
  dialogUpload:false,
  orders: [],
}

export interface IAppSlice {
  loading: boolean
  videoDrawerOpen: boolean
  dialogUpload:boolean
  orders: Array<string>
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    fetchAppSuccess(state, action) {
      setAll(state, action.payload)
    },
    openVideoDrawer(state,action) {
      state.videoDrawerOpen = action.payload.open
    },
    openDialogUpload(state,action) {
      state.dialogUpload = action.payload.open
    },
  },
})

const baseInfo = (state: IReduxState) => state.app

export default appSlice.reducer

export const { fetchAppSuccess, openVideoDrawer ,openDialogUpload} = appSlice.actions

export const getAppState = createSelector(baseInfo, (app) => app)
