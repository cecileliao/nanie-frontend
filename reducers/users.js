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
      //PARENT,
      searchDate: {},
      searchResult:[],
      parent: {},
      //dans contact: nameParent, firstNameParent, shortBio, gemProfil
      isParent: false,
      idMission: null,
      
    },
  };
  
export const userSlice = createSlice({
name: 'user',
initialState,
reducers: {
    login: (state, action) => {
    state.value.token = action.payload.token;
    state.value.email = action.payload.email;
    state.value.isParent = action.payload.isParent ? true : false
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
    addSearchDate: (state, action) => {
      state.value.searchDate = action.payload
    },
    removeSearchDate: (state, action) => {
      state.value.searchDate = null
    },
    addSearchResult: (state, action) => {
      state.value.searchResult = action.payload
    },
    displayProfil: (state, action) => {
      state.value.token = action.payload.token;
    },
    addIdMission: (state, action) => {
      state.value.idMission = action.payload.idMission;
    }

    // filterDispo: (state, action) => {
    //   console.log('filterDispo', startingDay, endingDay)
      // state.value.availabilities = state.value.availabilities.filter(e => (e.startingDay === action.payload.startingDay) && (e.endingDay === action.payload.endingDay));
      // console.log(`e`, e)
    // },
    // addPhoto: (state, action) => {
    //   state.value.photo = action.payload;
    //   },
    // removePhoto: (state, action) => {
    //     state.value.photo = null;
    //   },
},
});

export const { login, logout, updateUser, addPhoto, removePhoto, removeDispo, addDispo , updateDispo, addSearchDate, addSearchResult, removeSearchDate, displayProfil, addIdMission } = userSlice.actions;
export default userSlice.reducer;