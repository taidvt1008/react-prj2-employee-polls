import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { updateUserQuestion } from "./users";

export const RECEIVE_POLLS = "RECEIVE_POLLS";
export const ADD_POLL = "ADD_POLL";
export const ANSWER_POLL = "ANSWER_POLL";

export function receivePolls(polls) {
  return {
    type: RECEIVE_POLLS,
    polls,
  };
}

function addPoll(poll) {
  return {
    type: ADD_POLL,
    poll,
  };
}

function answerPoll(author, qid, answer) {
  return {
    type: ANSWER_POLL,
    author,
    qid,
    answer,
  };
}

export function handleAddPoll(optionOneText, optionTwoText, author) {
  return (dispatch) => {
    dispatch(showLoading());

    return saveQuestion({ optionOneText, optionTwoText, author })
      .then((poll) => {
        dispatch(addPoll(poll));
        dispatch(updateUserQuestion(poll.id, author));
      })
      .then(() => dispatch(hideLoading()))
      .catch((e) => console.log("Error when handleAddPoll: ", e));
  };
}

export function handleAnswerPoll(authedUser, qid, answer) {
  return (dispatch) => {
    dispatch(showLoading());

    return saveQuestionAnswer({ authedUser, qid, answer })
      .then(() => dispatch(answerPoll(authedUser, qid, answer)))
      .then(() => dispatch(hideLoading()))
      .catch((e) => console.log("Error when handleAnswerPoll: ", e));
  };
}
