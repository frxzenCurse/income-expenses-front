import { createSelector } from "@reduxjs/toolkit"
import type { ICategoryForm } from "../../types/forms"
import { apiSlice } from "../apiSlice"
import type { TypedUseQueryStateResult } from "@reduxjs/toolkit/query/react"
import type { ICategory } from "../../types/entities"

type GetCategorySelectFromResultArg = TypedUseQueryStateResult<ICategory[], any, any>

export const apiSliceWithCategories = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query<ICategory[], void>({
      query: () => ({
        url: '/category/'
      }),
      providesTags: ['Category'],
    }),
    updateCategory: builder.mutation<ICategory, ICategory>({
      query: (data) => ({
        url: '/category/update',
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['Category']
    }),
    createCategory: builder.mutation<ICategory, ICategoryForm>({
      query: (data) => ({
        url: '/category/create',
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['Category']
    }),
    deleteCategory: builder.mutation<number, number>({
      query: (id) => ({
        url: `/category/delete/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Category']
    }),
  })
})

export const {
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} = apiSliceWithCategories

export const selectCategoriesByType = createSelector(
  (res: GetCategorySelectFromResultArg) => res.data,
  (data) => {
    return {
      income: data ? data.filter(item => item.type === 'income') : [],
      expense: data ? data.filter(item => item.type === 'expenses') : [],
    }
  }
)