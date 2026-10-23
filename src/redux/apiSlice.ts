import { createApi } from "@reduxjs/toolkit/query/react";
import type { ILoginForm } from "../types/forms";
import { axiosBaseQuery } from "../api/service/axiosBaseQuery";
import { setToLocalStorage } from "../utils/localStorage";
import type { TokenResponse } from "../api/service/types";
import type { IUser } from "../types/entities";


export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Login', 'Category', 'Transaction'],
  endpoints: builder => ({
    getUser: builder.query<IUser, void>({
      query: () => ({
        url: '/user/',
      }),
      providesTags: ['Login']
    }),
    login: builder.mutation<TokenResponse, ILoginForm>({
      query: loginForm => ({
        url: '/auth/login',
        method: 'POST',
        data: loginForm,
      }),
      transformResponse: (response: TokenResponse) => {
        try {
          setToLocalStorage('access_token', `Bearer ${response.access_token}`)
        } catch (e) {
          console.log('ошибка при записи access_token', e)
        }
        return response;
      },
      invalidatesTags: (result, error) => {
        if (error) {
          return []
        }

        return [{type: 'Login'}]
      },
    }),
  })
}) 

export const { useGetUserQuery, useLoginMutation } = apiSlice;