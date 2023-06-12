import { combineReducers } from "@reduxjs/toolkit";
import clientsReducer from "./clients/clientsSlice";
import classesReducer from "./classes/classesSlice";
import clientReducer from "./client/clientSlice";
import classReducer from "./class/classSlice";

const rootReducer = combineReducers({
  clients: clientsReducer,
  classes: classesReducer,
  client: clientReducer,
  class: classReducer,
});

export default rootReducer;
