import { combineReducers } from "redux";
import authedUser from "./authedUser";
import polls from "./polls";
import users from "./users";
import { loadingBarReducer } from "react-redux-loading-bar";

export default combineReducers({
  authedUser,
  polls,
  users,
  loadingBar: loadingBarReducer,
});
