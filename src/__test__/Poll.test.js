import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Poll from "../components/Poll";

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const pollID = "8xf0y6ziyjabvozdd253nd"
const users = {
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

const polls = {
  [pollID]: {
    id: "8xf0y6ziyjabvozdd253nd",
    author: "hulk",
    timestamp: 1687771713000,
    optionOne: {
      votes: ["blackwidow"],
      text: "Build our new application with Javascript",
    },
    optionTwo: {
      votes: ["hulk"],
      text: "Build our new application with Typescript",
    },
  },
};
const mockStore = configureMockStore();
const store = mockStore({
  users,
  authedUser: "hulk",
  polls,
});

describe("Poll", () => {
  it("will have all expected fields (unanswered)", () => {
    const component = render(
      <Provider store={store}>
        <Poll id={pollID} answered={false}/>
      </Provider>
    );

    const header = component.getByText(/Would You Rather/);
    expect(header).toBeInTheDocument();

    const option1Input = component.getByTestId("poll-option1-input");
    expect(option1Input).toBeInTheDocument();

    const option2Input = component.getByTestId("poll-option2-input");
    expect(option2Input).toBeInTheDocument();
  });

  it("will have all expected fields (answered)", () => {
    const component = render(
      <Provider store={store}>
        <Poll id={pollID} answered={true}/>
      </Provider>
    );

    const header = component.getByText(/Would You Rather/);
    expect(header).toBeInTheDocument();

    const result = component.getByText(/Result/);
    expect(result).toBeInTheDocument();
  });
});
