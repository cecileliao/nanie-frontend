import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    loadMessages: (state, action) => {
      state.value = action.payload;
    },
    addMessage: (state, action) => {
      state.value.unshift(action.payload);
    },
  },
});

export const { loadMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;