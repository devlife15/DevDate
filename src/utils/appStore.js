import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedSlice from "./feedSlice";
import connectionSlice from "./connectionSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedSlice,
    connections: connectionSlice,
  },
});

export default store;
