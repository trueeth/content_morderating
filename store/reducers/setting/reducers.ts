import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lang: 'en',
}

export interface ISettingSlice {
  lang: string
}

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setLang(state, action) {
      state.lang = action.payload
    },
  }
})

export default settingSlice.reducer
export const {
  setLang
} = settingSlice.actions
