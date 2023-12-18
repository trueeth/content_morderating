import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  mediaSubOpen: false,
  type: 'video',
  rowIndex: -1,
  subRowIndex: 0,
  drawerData: null
}

export interface IDrawerSlice {
  mediaSubOpen: boolean,
  type: 'video' | 'document',
  rowIndex: number,
  subRowIndex: number,
  drawerData?: any,
}

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    openMediaSubDrawer(state, action) {
      if (action.payload.open !== undefined)
        state.mediaSubOpen = action.payload.open
      if (action.payload.type !== undefined)
        state.type = action.payload.type
      if (action.payload.rowIndex !== undefined)
        state.rowIndex = action.payload.rowIndex
      if (action.payload.subRowIndex !== undefined)
        state.subRowIndex = action.payload.subRowIndex
      if (action.payload.drawerData !== undefined)
        state.drawerData = action.payload.drawerData
    }
  }
})

export default drawerSlice.reducer

export const { openMediaSubDrawer } = drawerSlice.actions
