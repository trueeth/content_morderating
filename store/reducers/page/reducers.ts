import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalCount: 1,
  pageSize: 10,
  pageIndex: 1
}

export interface IPaginationSlice {
  totalCount: number
  pageSize: number
  pageIndex: number
}

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPaginationIndex(state, action) {
      state.pageIndex = action.payload.pageIndex
    },
    setPaginationSize(state, action) {
      state.pageSize = action.payload.pageSize
    },
    setPaginationTotalCount(state, action) {
      state.totalCount = action.payload
    },
    setPagination(state, action) {
      state.totalCount = action.payload?.totalCount
      state.pageSize = action.payload?.pageSize
      state.pageIndex = action.payload?.pageIndex
    },
    setPageinit(state) {
      state.totalCount = initialState.totalCount
      state.pageSize = initialState.pageSize
      state.pageIndex = initialState.pageIndex
    }
  }
})

export default paginationSlice.reducer
export const {
  setPaginationIndex,
  setPaginationTotalCount,
  setPageinit
} = paginationSlice.actions
