// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number
  name: string
}

export enum OrderType {
  SUPPLY,
  BORROW,
}

export enum DatePickerType {
  START,
  END,
}

export enum OrderState {
  OPEN,
  WORKING,
  CLOSED,
  CANCELED,
}

export enum OrderRole {
  SUPPLY,
  BORROW,
}

export type Order = {
  id: bigint
  lender: string
  borrower: string
  loanToken: string
  loanAmount: bigint
  collateralToken: string
  collateralAmount: bigint
  lenderFeeAmount: bigint
  timestamps: Array<bigint>
  rewardAmount: bigint
  status: OrderState
  role: OrderRole
}
