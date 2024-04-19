import { configureStore } from '@reduxjs/toolkit'
import  activeUser  from './slice/userSlice'

export const store = configureStore({
  reducer: {
    user:activeUser
  },
})