import {
  users,
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA.js";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => {
      const plainUsers = hiddenPassword(users);
      return {
        users: plainUsers,
        questions,
      };
    }
  );
}

function hiddenPassword(users) {
  let plainUsers = {};
  for (const [userId, user] of Object.entries(users)) {
    const { id, name, avatarURL, answers, questions } = user;
    const plainUser = { id, name, avatarURL, answers, questions };
    plainUsers = {
      ...plainUsers,
      [userId]: plainUser,
    };
  }
  return plainUsers;
}

export function saveQuestion(info) {
  return _saveQuestion(info);
}

export function saveQuestionAnswer(info) {
  return _saveQuestionAnswer(info);
}

export async function checkLoginInfo(userName, password) {
  const users = await _getUsers();
  if (!users.hasOwnProperty(userName)) {
    console.log("username is incorrect");
    return false;
  }
  if (users[userName].password !== password) {
    console.log("password is incorrect");
    return false;
  }
  return true;
}

export function separatePollsByType(polls, authedUser) {
  let answeredPolls = [];
  let unansweredPolls = [];
  for (const [pollID, poll] of Object.entries(polls)) {
    const { optionOne, optionTwo } = poll;
    if (optionOne.votes.includes(authedUser)) {
      answeredPolls.push(poll);
      continue;
    }

    if (optionTwo.votes.includes(authedUser)) {
      answeredPolls.push(poll);
      continue;
    }

    unansweredPolls.push(poll);
  }
  return { answeredPolls, unansweredPolls };
}

export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-US");
  return time.substr(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}
