import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPage from '../../pages/main/MainPage'
import ErrorPage from '../../pages/error/ErrorPage'

function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/qwe' element={<ErrorPage />} />
    </Routes>
  )
}

export default AppRouter