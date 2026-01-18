import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedSlice from "./feedSlice";
import connectionSlice from "./connectionSlice";
import requestSlice from "./requestSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedSlice,
    connections: connectionSlice,
    requests: requestSlice,
  },
});

export default store;
