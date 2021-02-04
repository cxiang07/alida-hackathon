import { combineReducers } from "redux";
import { storyReducer } from "./reducers/storeReducer";

export default combineReducers({
  stories: storyReducer,
});
