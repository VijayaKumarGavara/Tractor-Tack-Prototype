import { configureStore } from "@reduxjs/toolkit";
import workReducer from "./workSlice";
import paymentReducer from "./paymentSlice";
import farmerSearchReducer from "./farmerSearchSlice";
import tractorDriverReducer from "./tractorDriverSlice";
const appStore = configureStore({
  reducer: {
    work: workReducer,
    paymentDues: paymentReducer,
    farmerSearch: farmerSearchReducer,
    tractorDriver: tractorDriverReducer,
  },
});

export default appStore;
