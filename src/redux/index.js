import { combineReducers } from "redux";
import { storyReducer } from "./reducers/storeReducer";
import { userReducer } from "./reducers/userReducer";

export default combineReducers({
  stories: storyReducer,
  userInfo: userReducer,
});
