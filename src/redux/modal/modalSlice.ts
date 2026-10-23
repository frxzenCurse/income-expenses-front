import { createSlice, type PayloadAction, type UnknownAction } from "@reduxjs/toolkit"
import { apiSliceWithCategories } from "../category/categorySlice"
import { apiSliceWithTransactions } from "../transaction/transactionSlice"
import type { ICategory, ITransaction } from "../../types/entities";


interface ModalState {
  isOpen: boolean,
  modalData: ModalData,
}

export interface ModalData {
  type: string,
  title: string,
  data: null | ICategory | ITransaction,
}

const initialState: ModalState = {
  isOpen: false,
  modalData: {
    type: '',
    title: '',
    data: null,
  }
}

const endpointsToTrack = [
  apiSliceWithCategories.endpoints.createCategory.matchFulfilled,
  apiSliceWithCategories.endpoints.updateCategory.matchFulfilled,
  apiSliceWithTransactions.endpoints.createTransaction.matchFulfilled,
  apiSliceWithTransactions.endpoints.updateTransaction.matchFulfilled,
];

const isDataFulfilled = (action: UnknownAction) => 
  endpointsToTrack.some((matcher) => matcher(action));

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalData>) => {
      state.isOpen = true
      state.modalData = action.payload
    },
    closeModal: (state) => {
      state.isOpen = false
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(isDataFulfilled, (state) => {
        state.isOpen = false
      })
  }
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer