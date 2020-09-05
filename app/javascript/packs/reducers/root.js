import { combineReducers } from "redux";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  current_user: userReducer,
});

export default rootReducer;
