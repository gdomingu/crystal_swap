import { combineReducers } from "redux";
import userReducer from "./userReducer";
// import reviewReducer from "./reviewReducer";

const rootReducer = combineReducers({
  current_user: userReducer,
  // reviews: reviewReducer,
});

export default rootReducer;
