import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { 
      token: null, 
      email: null,
      password: null,
      photo: null,
      name: null,
      firstName: null,
      phone: null,
      age: null,
      sexe: null,
      address: null,
      zip: null,
      city: null,
      signup: null,
      introBio: null,
      longBio: null,
      talents: {},
      //AIDANT
      aidant: {},
      availabilities: [],
      // ratebyHour: null,
      // car: false,
      // abilitiesAidant: null,
      //PARENT
      parent: {},
      //dans contact: nameParent, firstNameParent, shortBio, gemProfil
      isParent: false
    
      
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
    updateUser: (state, action) => {
      state.value = {
        ...state.value,
        ...action.payload
      }
    },
    updateDispo: (state, action) => {
      state.value.availabilities = action.payload
    },
    addDispo: (state, action) => {
      state.value.availabilities.push(action.payload)
    },
    removeDispo: (state, action) => {
      //console.log('state.value.availabilities => ',state.value.availabilities);
      state.value.availabilities = state.value.availabilities.filter(e => e.availabilityId !== action.payload);
    },
    addPhoto: (state, action) => {
      state.value.photo = action.payload;
      },
    removePhoto: (state, action) => {
        state.value.photo = null;
      },
},
});

export const { login, logout, updateUser, addPhoto, removePhoto, removeDispo, addDispo , updateDispo} = userSlice.actions;
export default userSlice.reducer;