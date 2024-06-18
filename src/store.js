import { configureStore } from '@reduxjs/toolkit'
import  activeUser  from './slice/userSlice'
import themeReducer from './slice/themeSlice'
import activeChatSlice from './slice/activeChatSlice'

export const store = configureStore({
  reducer: {
    user:activeUser,
    theme:themeReducer,
    activeChat:activeChatSlice
  },
})