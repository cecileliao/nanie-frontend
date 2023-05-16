import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { 
      token: null, 
      email: null, 
      selectedImageAidant: null,
      nameAidant: null,
      firstNameAidant: null,
      phoneAidant: null,
      ageAidant: null,
      sexeAidant: null,
      addressAidant: null,
      zipAidant: null,
      cityAidant: null,
      ratebyHourAidant: null,
      carAidant: null,
      introBioAidant: null,
      longBioAidant: null,
      abilitiesAidant: null,
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
    updateAidant: (state) => {
      state.value.selectedImageAidant = action.payload.selectedImageAidant;
      state.value.nameAidant = action.payload.nameAidant;
      state.value.firstNameAidant = action.payload.firstNameAidant;
      state.value.phoneAidant = action.payload.phoneAidant;
      state.value.ageAidant = action.payload.ageAidant;
      state.value.sexeAidant = action.payload.sexeAidant;
      state.value.addressAidant = action.payload.addressAidant;
      state.value.zipAidant = action.payload.zipAidant;
      state.value.cityAidant = action.payload.cityAidant;
      state.value.ratebyHour = action.payload.ratebyHour;
      state.value.car = action.payload.car;
      state.value.introBioAidant = action.payload.introBioAidant;
      state.value.longBioAidant = action.payload.longBioAidant;
      state.value.abilitiesAidant = action.payload.abilitiesAidant;
      },

},
});

export const { login, logout, updateAidant } = userSlice.actions;
export default userSlice.reducer;