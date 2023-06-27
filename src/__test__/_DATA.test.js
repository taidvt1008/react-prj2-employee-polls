import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";

describe("_saveQuestion", () => {
  it("the saved question is returned", async () => {
    const question = {
      author: "udactiy",
      optionOneText: "optionOneText",
      optionTwoText: "optionTwoText",
    };

    const { author, optionOne, optionTwo } = await _saveQuestion(question);

    expect(author).toBe(question.author);
    expect(optionOne.text).toBe(question.optionOneText);
    expect(optionOne.votes.length).toBe(0);
    expect(optionTwo.text).toBe(question.optionTwoText);
    expect(optionTwo.votes.length).toBe(0);
  });

  it("an error is returned because of incorrect data input", async () => {
    const question = {
      author: "udactiy",
      optionOneText: "optionOneText mock",
      //optionTwoText: "optionTwoText mock", //missing one option: optionTwoText
    };

    await expect(_saveQuestion(question)).rejects.toBe(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("the saved question is returned", async () => {
    //have to use 'real' authedUser&qid from objects of _DATA.js
    const answer = {
      authedUser: "hulk",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionOne",
    };

    const { users, questions } = await _saveQuestionAnswer(answer);

    expect(users[answer.authedUser].answers[answer.qid] === answer.answer).toBe(
      true
    );

    expect(
      questions[answer.qid][answer.answer].votes.includes(answer.authedUser)
    ).toBe(true);
  });

  it("an error is returned because of missing data input", async () => {
    //have to use 'real' authedUser&qid from objects of _DATA.js
    const answer = {
      //   authedUser: "hulk", //missing one option: authedUser
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionOne",
    };

    await expect(_saveQuestionAnswer(answer)).rejects.toBe(
      "Please provide authedUser, qid, and answer"
    );
  });
});
