import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import mainReducer from "../reducers/mainReducer";
import alertReducer from "../reducers/alertReducer";

const allReducers = combineReducers({
  mainReducer,
  alertReducer,
});

const store = createStore(mainReducer, composeWithDevTools());

export default store;
