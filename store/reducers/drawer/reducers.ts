import { createSlice } from '@reduxjs/toolkit'
import { TResVideo } from '@interfaces/apis/videos.types'
import { TVideoRowType } from '@interfaces/types'

const initialState = {
  mediaSubOpen: false,
  summary: {},
  videoContent: {},
  type: 'video'
}

export interface IDrawerSlice {
  mediaSubOpen: boolean
  summary: TResVideo.TMeidaSummaries
  videoContent: TVideoRowType
  type?: 'video' | 'document'
}

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    openMediaSubDrawer(state, action) {
      state.mediaSubOpen = action.payload.open
      state.summary = action.payload.summary
      state.videoContent = action.payload.row
      state.type = action.payload.type
    }
  }
})

export default drawerSlice.reducer

export const { openMediaSubDrawer } = drawerSlice.actions
