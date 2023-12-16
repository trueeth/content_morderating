import { createSlice } from '@reduxjs/toolkit'
import { EDocumentApprovalDlg } from '@interfaces/enums'

const initialState = {
  videoUpload: false,
  documentApproval: {
    open: false,
    type: EDocumentApprovalDlg.document,
    questionIndex: 0,
    docIndex: 0,
    topicIndex: 0,
    pageIndex: 0
  }
}


export interface IDialogSlice {
  videoUpload: boolean
  documentApproval: {
    open: boolean
    type: EDocumentApprovalDlg
    docIndex: number
    topicIndex: number
    questionIndex: number
    pageIndex: number
  }
}

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openVideoUploadDialog(state, action) {
      state.videoUpload = action.payload.open
    },
    openDocumentApproval(state, action) {

      if (action.payload.open!==undefined)
        state.documentApproval.open = action.payload.open
      else state.documentApproval.open = true
      if (action.payload.type)
        state.documentApproval.type = action.payload.type
      if (action.payload.docIndex)
        state.documentApproval.docIndex = action.payload.docIndex
      if (action.payload.topicIndex)
        state.documentApproval.topicIndex = action.payload.topicIndex
      if (action.payload.questionIndex)
        state.documentApproval.questionIndex = action.payload.questionIndex
      if (action.payload.pageIndex)
        state.documentApproval.pageIndex = action.payload.pageIndex
    }
  }
})

export default dialogSlice.reducer
export const {
  openVideoUploadDialog,
  openDocumentApproval
} = dialogSlice.actions
