import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { 
      token: null, 
      email: null,
      password: null,
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
      parameters: {
        mobility: false,
        hygiene: false,
        cooking: false,
        entertainment: false,
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
      // state.value.photoAidant = action.payload.photoAidant;
      // state.value.nameAidant = action.payload.nameAidant;
      // state.value.firstNameAidant = action.payload.firstNameAidant;
      // state.value.phoneAidant = action.payload.phoneAidant;
      // state.value.ageAidant = action.payload.ageAidant;
      // state.value.sexeAidant = action.payload.sexeAidant;
      // state.value.addressAidant = action.payload.addressAidant;
      // state.value.zipAidant = action.payload.zipAidant;
      // state.value.cityAidant = action.payload.cityAidant;
      // state.value.ratebyHour = action.payload.ratebyHour;
      // state.value.car = action.payload.car;
      // state.value.introBioAidant = action.payload.introBioAidant;
      // state.value.longBioAidant = action.payload.longBioAidant;
      // state.value.abilitiesAidant = action.payload.abilitiesAidant;
      // state.value.mobility = action.payload.switchesState[0];
      // state.value.hygiene = action.payload.switchesState[1];
      // state.value.cooking = action.payload.switchesState[2];
      // state.value.entertainment = action.payload.switchesState[3];
      state.value = {
        ...state.value,
        ...action.payload
      }
      },

},
});

export const { login, logout, updateAidant } = userSlice.actions;
export default userSlice.reducer;