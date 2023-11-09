import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface ICreateOrder {
  loanAmount: string
  collateralAmount: string
  lenderFee: number
  timestamps: number[]
}

export const createSupplyOrder = createAsyncThunk(
  'action/createSupplyOrder',
  async (
    { loanAmount, collateralAmount, lenderFee, timestamps }: ICreateOrder,
    { dispatch }
  ) => {}
)

export const createBorrowOrder = createAsyncThunk(
  'action/createBorrowOrder',
  async (
    { loanAmount, collateralAmount, lenderFee, timestamps }: ICreateOrder,
    { dispatch }
  ) => {}
)

export const getOrder = createAsyncThunk('action/getOrders', async ({}) => {})

export const liquidateOrder = createAsyncThunk(
  'action/liquidate',
  async () => {}
)
export const cancelOrder = createAsyncThunk('action/cancel', async () => {})
export const repayOrder = createAsyncThunk('action/repay', async () => {})

const now = Date.now()

const initialState = {
  supply: {
    loanToken: '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e',
    loanAmount: '0',
    collateralToken: '0xc7198437980c041c805a1edcba50c1ce5db95118',
    collateralAmount: '0',
    lenderFee: 0,
    startTimestamp: now + 60 * 60 * 1000 * 3,
    endTimestamp: now + 60 * 60 * 24 * 1000 * 7,
  },
  borrow: {
    loanToken: '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e',
    loanAmount: '0',
    collateralToken: '0xc7198437980c041c805a1edcba50c1ce5db95118',
    collateralAmount: '0',
    lenderFee: 0,
    startTimestamp: now,
    endTimestamp: now + 60 * 60 * 24 * 1000 * 7,
  },
}

export interface IActionSlice {
  supply: {
    loanAmount: string
    collateralAmount: string
    lenderFee: number
    startTimestamp: number
    endTimestamp: number
  }
  borrow: {
    loanAmount: string
    collateralAmount: string
    startTimestamp: number
    endTimestamp: number
  }
}

const actionSlice = createSlice({
  name: 'action',
  initialState,
  reducers: {
    setSupLoanToken(state, action: { payload: { loanToken: string } }) {
      state.supply.loanToken = action.payload.loanToken
    },
    setSupLoanAmount(state, action: { payload: { loanAmount: string } }) {
      state.supply.loanAmount = action.payload.loanAmount
    },
    setSupCollateralToken(
      state,
      action: { payload: { collateralToken: string } }
    ) {
      state.supply.collateralToken = action.payload.collateralToken
    },
    setSupCollateralAmount(
      state,
      action: { payload: { collateralAmount: string } }
    ) {
      state.supply.collateralAmount = action.payload.collateralAmount
    },
    setSupLenderFee(state, action: { payload: { lenderFee: number } }) {
      state.supply.lenderFee = action.payload.lenderFee
    },
    setSupStartTimestamp(state, action: { payload: { timestamp: number } }) {
      state.supply.startTimestamp = action.payload.timestamp
    },
    setSupEndTimestamp(state, action: { payload: { timestamp: number } }) {
      state.supply.endTimestamp = action.payload.timestamp
    },
    setBorrowLoanToken(state, action: { payload: { loanToken: string } }) {
      state.borrow.loanToken = action.payload.loanToken
    },
    setBorrowLoanAmount(state, action: { payload: { loanAmount: string } }) {
      state.borrow.loanAmount = action.payload.loanAmount
    },
    setBorrowCollateralToken(
      state,
      action: { payload: { collateralToken: string } }
    ) {
      state.borrow.collateralToken = action.payload.collateralToken
    },
    setBorrowCollateralAmount(
      state,
      action: { payload: { collateralAmount: string } }
    ) {
      state.borrow.collateralAmount = action.payload.collateralAmount
    },
    setBorrowStartTimestamp(state, action: { payload: { timestamp: number } }) {
      state.borrow.startTimestamp = action.payload.timestamp
    },
    setBorrowEndTimestamp(state, action: { payload: { timestamp: number } }) {
      state.borrow.endTimestamp = action.payload.timestamp
    },
  },
})

const baseInfo = (state: RootState) => state.action
export default actionSlice.reducer

export const {
  setSupLoanToken,
  setSupLoanAmount,
  setSupCollateralToken,
  setSupCollateralAmount,
  setSupLenderFee,
  setSupStartTimestamp,
  setSupEndTimestamp,
  setBorrowLoanToken,
  setBorrowLoanAmount,
  setBorrowCollateralToken,
  setBorrowCollateralAmount,
  setBorrowStartTimestamp,
  setBorrowEndTimestamp,
} = actionSlice.actions

export const getActionState = createSelector(baseInfo, (action) => action)
