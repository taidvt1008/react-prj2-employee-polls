export const RECEIVE_USERS = "RECEIVE_USERS";
export const UPDATE_USER_QUESTIONS = "UPDATE_USER_QUESTIONS";
export const UPDATE_USER_ANSWERS = "UPDATE_USER_ANSWERS";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function updateUserQuestion(pollID, author) {
  return {
    type: UPDATE_USER_QUESTIONS,
    pollID,
    author,
  };
}

export function updateUserAnswer(authedUser, qid, answer) {
  return {
    type: UPDATE_USER_ANSWERS,
    authedUser,
    qid,
    answer,
  };
}
