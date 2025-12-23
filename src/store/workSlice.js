import { createSlice } from "@reduxjs/toolkit";

const workSlice = createSlice({
  name: "work",
  initialState: {
    
    recentWorks: [],
  },
  reducers: {
   
    addRecentWorks: (state, action) => {
      state.recentWorks = action.payload;
    },
    
  },
});
export const {  addRecentWorks } = workSlice.actions;
export default workSlice.reducer;
