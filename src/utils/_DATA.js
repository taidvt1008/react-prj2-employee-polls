let users = {
  captainamerica: {
    id: "captainamerica",
    password: "123",
    name: "Captain America",
    avatarURL: "/avatar/captain-america.jpg",
    answers: {
      vthrdm985a262al8qx3do: "optionOne",
      xj352vofupe1dqz9emx13r: "optionTwo",
    },
    questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
  },
  blackwidow: {
    id: "blackwidow",
    password: "123",
    name: "Black Widow",
    avatarURL: "/avatar/black-widow.jpg",
    answers: {
      "8xf0y6ziyjabvozdd253nd": "optionOne",
      "6ni6ok3ym7mf1p33lnez": "optionOne",
      am8ehyc8byjqgar0jgpub9: "optionTwo",
      loxhs1bqm25b708cmbf3g: "optionTwo",
    },
    questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
  },
  ironman: {
    id: "ironman",
    password: "123",
    name: "Iron Man",
    avatarURL: "/avatar/iron-man.jpg",
    answers: {
      xj352vofupe1dqz9emx13r: "optionOne",
    },
    questions: [],
  },
  hulk: {
    id: "hulk",
    password: "123",
    name: "Crazy Hulk",
    avatarURL: "/avatar/hulk.jpg",
    answers: {
      xj352vofupe1dqz9emx13r: "optionOne",
      vthrdm985a262al8qx3do: "optionTwo",
      "6ni6ok3ym7mf1p33lnez": "optionOne",
    },
    questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
  },
};

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: "8xf0y6ziyjabvozdd253nd",
    author: "blackwidow",
    timestamp: 1687771713000,
    optionOne: {
      votes: ["blackwidow"],
      text: "Build our new application with Javascript",
    },
    optionTwo: {
      votes: [],
      text: "Build our new application with Typescript",
    },
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: "6ni6ok3ym7mf1p33lnez",
    author: "hulk",
    timestamp: 1687305600000,
    optionOne: {
      votes: [],
      text: "hire more frontend developers",
    },
    optionTwo: {
      votes: ["hulk", "blackwidow"],
      text: "hire more backend developers",
    },
  },
  am8ehyc8byjqgar0jgpub9: {
    id: "am8ehyc8byjqgar0jgpub9",
    author: "blackwidow",
    timestamp: 1687508100000,
    optionOne: {
      votes: [],
      text: "conduct a release retrospective 1 week after a release",
    },
    optionTwo: {
      votes: ["blackwidow"],
      text: "conduct release retrospectives quarterly",
    },
  },
  loxhs1bqm25b708cmbf3g: {
    id: "loxhs1bqm25b708cmbf3g",
    author: "captainamerica",
    timestamp: 1687627800000,
    optionOne: {
      votes: [],
      text: "have code reviews conducted by peers",
    },
    optionTwo: {
      votes: ["blackwidow"],
      text: "have code reviews conducted by managers",
    },
  },
  vthrdm985a262al8qx3do: {
    id: "vthrdm985a262al8qx3do",
    author: "captainamerica",
    timestamp: 1687709100000,
    optionOne: {
      votes: ["captainamerica"],
      text: "take a course on ReactJS",
    },
    optionTwo: {
      votes: ["hulk"],
      text: "take a course on unit testing with Jest",
    },
  },
  xj352vofupe1dqz9emx13r: {
    id: "xj352vofupe1dqz9emx13r",
    author: "hulk",
    timestamp: 1687776300000,
    optionOne: {
      votes: ["hulk", "ironman"],
      text: "deploy to production once every two weeks",
    },
    optionTwo: {
      votes: ["captainamerica"],
      text: "deploy to production once every month",
    },
  },
};

function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function _getUsers() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...users }), 1000);
  });
}

export function _getQuestions() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...questions }), 1000);
  });
}

function formatQuestion({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    },
  };
}

export function _saveQuestion(question) {
  return new Promise((resolve, reject) => {
    if (
      !question.optionOneText ||
      !question.optionTwoText ||
      !question.author
    ) {
      reject("Please provide optionOneText, optionTwoText, and author");
    }

    const formattedQuestion = formatQuestion(question);
    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion,
      };

      resolve(formattedQuestion);
    }, 1000);
  });
}

export function _saveQuestionAnswer({ authedUser, qid, answer }) {
  return new Promise((resolve, reject) => {
    if (!authedUser || !qid || !answer) {
      reject("Please provide authedUser, qid, and answer");
    }

    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer,
          },
        },
      };

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser]),
          },
        },
      };

      // resolve(true);
      resolve({ users, questions }); //update returned value to verify new update on test
    }, 500);
  });
}
