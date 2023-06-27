import { RECEIVE_POLLS, ADD_POLL, ANSWER_POLL } from "../actions/polls";

export default function polls(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POLLS:
      return {
        ...state,
        ...action.polls,
      };
    case ADD_POLL:
      return {
        ...state,
        [action.poll.id]: action.poll,
      };
    case ANSWER_POLL:
      const { author, qid, answer } = action;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([author]),
          },
        },
      };
    default:
      return state;
  }
}
