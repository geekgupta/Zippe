import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slicers'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})