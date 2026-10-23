import { createSelector } from "@reduxjs/toolkit"
import dayjs from 'dayjs';
import { apiSlice } from '../apiSlice';
import type { TypedUseQueryStateResult } from '@reduxjs/toolkit/query/react';
import type { ITransaction, ITransactionRequest } from "../../types/entities";

type GetTransactionsSelectFromResultArg = TypedUseQueryStateResult<ITransaction[], any, any>

export const apiSliceWithTransactions = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getTransactions: builder.query<ITransaction[], void>({
      query: () => ({
        url: '/transaction/'
      }),
      providesTags: ['Transaction'],
    }),
    updateTransaction: builder.mutation<ITransaction, ITransaction>({
      query: (data) => ({
        url: '/transaction/update',
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['Transaction'],
    }),
    createTransaction: builder.mutation<ITransaction, ITransactionRequest>({
      query: (data) => ({
        url: '/transaction/create',
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['Transaction'],
    }),
    deleteTransaction: builder.mutation<number, number>({
      query: (id) => ({
        url: `/transaction/delete/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Transaction'],
    }),
  })
})

export const {
  useGetTransactionsQuery,
  useUpdateTransactionMutation,
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
} = apiSliceWithTransactions

export const selectTransactionsByCategory = createSelector(
  (res: GetTransactionsSelectFromResultArg) => res.data,
  (res: GetTransactionsSelectFromResultArg, categoryId: number) => categoryId,
  (data, categoryId) => data ? data.filter(item => item.categoryId === categoryId) : [],
  {
    memoizeOptions: {
      maxSize: 10 
    }
  }
)

export const selectTransactionByDates = createSelector(
  (res: GetTransactionsSelectFromResultArg) => res.data,
  (data) => {
    let dates: string[] = []
    let transactions: Record<string, ITransaction[]> = {}

    if (!data) return null;

    data.forEach(item => {
      if (!dates.includes(item.date)) {
        dates.push(item.date)
      }
      if (transactions[item.date]) {
        transactions[item.date].push(item)
      } else {
        transactions[item.date] = [item]
      }
    })
    dates.sort((a, b) => dayjs(b, 'DD-MM-YYYY').diff(dayjs(a, 'DD-MM-YYYY')))

    return {
      dates: dates,
      transactions: transactions,
    }
  },
)