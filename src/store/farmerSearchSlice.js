import { createSlice } from "@reduxjs/toolkit";

const farmerSearchSlice = createSlice({
  name: "farmerSearch",
  initialState: {
    farmerResults: [],
    selectedFarmer: null,
    hasSearched: false,
  },
  reducers: {
    setFarmerResults: (state, action) => {
      state.farmerResults = action.payload;
    },
    setSelectedFarmer: (state, action) => {
      state.selectedFarmer = action.payload;
    },
    setHasSearched: (state, action) => {
      state.hasSearched = action.payload;
    },
    resetFarmerSearch: (state) => {
      state.farmerResults = [];
      state.selectedFarmer = null;
      state.hasSearched = false;
    },
  },
});

export const {
  setFarmerResults,
  setSelectedFarmer,
  setHasSearched,
  resetFarmerSearch,
} = farmerSearchSlice.actions;
export default farmerSearchSlice.reducer;
