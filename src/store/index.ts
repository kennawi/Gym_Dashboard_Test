import { configureStore } from "@reduxjs/toolkit";
// import clientsReducer from "./clients/clientsSlice";
import rootReducer from "./rootReducer";
import clientsReducer from "./clients/clientsSlice";

const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
