import { createSlice } from "@reduxjs/toolkit";

const tractorDriverSlice = createSlice({
  name: "tractorDriver",
  initialState: { loggedInTractorDriver: null, authCheck: false },
  reducers: {
    setLoggedInTractorDriver: (state, action) => {
      state.loggedInTractorDriver = action.payload;
      state.authCheck = true;
    },
    setAuthChecked: (state) => {
      state.authCheck = true;
    },
  },
});

export const { setLoggedInTractorDriver, setAuthChecked } = tractorDriverSlice.actions;
export default tractorDriverSlice.reducer;
