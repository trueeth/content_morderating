import { createSlice } from '@reduxjs/toolkit'
import { TResVideo } from '@/interfaces/apis/videos.types'
import { TVideoRowType } from '@/interfaces/types'

const initialState = {
  videoSub: false,
  summary: {},
  videoContent: {}
}

export interface IDrawerSlice {
  videoSub: boolean
  summary: TResVideo.TMeidaSummaries
  videoContent: TVideoRowType
}

const drawerSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openVideoSubDrawer(state, action) {
      state.videoSub = action.payload.open
      state.summary = action.payload.summary
      state.videoContent = action.payload.row
    }
  }
})

export default drawerSlice.reducer

export const { openVideoSubDrawer } = drawerSlice.actions
