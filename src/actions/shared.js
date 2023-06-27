import { getInitialData } from "../utils/api";
import { setAuthedUser } from "./authedUser";
import { receivePolls } from "./polls";
import { receiveUsers } from "./users";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());

    return getInitialData().then(({ users, questions }) => {
      dispatch(receivePolls(questions));
      dispatch(receiveUsers(users));
      dispatch(setAuthedUser(null));
      dispatch(hideLoading());
    });
  };
}
