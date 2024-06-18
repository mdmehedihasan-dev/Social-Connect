import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};
export const activeChatSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    activeChatUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { activeChatUser } = activeChatSlice.actions;

export default activeChatSlice.reducer;
