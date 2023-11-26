import {  createSlice } from '@reduxjs/toolkit'


const initialState = {
  videoSub: false,
}

export interface IDrawerSlice {
  videoSub: boolean
}

const drawerSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openVideoSubDrawer(state,action) {
      state.videoSub = action.payload.open
    }
  },
})


export default drawerSlice.reducer

export const {  openVideoSubDrawer} = drawerSlice.actions

