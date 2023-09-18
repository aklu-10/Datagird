import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../features/productsSlice.js'

export const store = configureStore({
  reducer: {
    products:productsReducer
  },
})