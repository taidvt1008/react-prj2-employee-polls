import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Nav from "../components/Nav";

import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
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
const store = mockStore({
  users: users,
  authedUser: "hulk",
});

describe("Nav", () => {
  it("will have all expected fields", () => {
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Nav />
        </Provider>
      </MemoryRouter>
    );

    const homeNav = component.getByText(/Home/i);
    const leaderboardNav = component.getByText(/Leaderboard/i);
    const newPollNav = component.getByText(/New Poll/i);

    expect(homeNav).toBeInTheDocument();
    expect(leaderboardNav).toBeInTheDocument();
    expect(newPollNav).toBeInTheDocument();
  });
});
