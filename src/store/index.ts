import { compose, applyMiddleware, combineReducers } from "redux";
/** Redux ToolKit */
import { configureStore } from "@reduxjs/toolkit";
/** Redux Thunk */
import thunk from "redux-thunk";
// Infer the `RootState` and `AppDispatch` types from the store itself
import mapsRecuder from "./maps/reducer";

const rootReducer = combineReducers({
  mapsState: mapsRecuder,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export { store };
