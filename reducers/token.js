import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {token: null}
  };
  
export const tokenSlice = createSlice({
name: 'token',
initialState,
reducers: {
    addToken: (state, action) => {
    state.value.token = action.payload;
    },
    
},
});

export const { addToken } = tokenSlice.actions;
export default tokenSlice.reducer;