import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { 
      token: null, 
      emailAidant: null,
      passwordAidant: null,
      photoAidant: null,
      nameAidant: null,
      firstNameAidant: null,
      phoneAidant: null,
      ageAidant: null,
      sexeAidant: null,
      addressAidant: null,
      zipAidant: null,
      cityAidant: null,
      ratebyHour: null,
      car: false,
      introBioAidant: null,
      longBioAidant: null,
      abilitiesAidant: null,
      talents: {
        // mobility: false,
        // hygiene: false,
        // cooking: false,
        // entertainment: false,
      }
      
    },
  };
  
export const userSlice = createSlice({
name: 'user',
initialState,
reducers: {
    login: (state, action) => {
    state.value.token = action.payload.token;
    state.value.email = action.payload.email;
    },
    logout: (state) => {
    state.value.token = null;
    state.value.email = null;
    },
    updateAidant: (state, action) => {
      state.value = {
        ...state.value,
        ...action.payload
      }
      },

},
});

export const { login, logout, updateAidant } = userSlice.actions;
export default userSlice.reducer;