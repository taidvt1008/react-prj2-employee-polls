import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import Login from "../components/Login";

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});

describe("Login", () => {
  it("will match snapshot", () => {
    const component = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });

  it("will have all expected fields", () => {
    const component = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const usernameInput = component.getByTestId("login-username-input");
    expect(usernameInput).toBeInTheDocument();

    const passwordInput = component.getByTestId("login-password-input");
    expect(passwordInput).toBeInTheDocument();

    const signInButton = component.getByText(/Sign In/);
    expect(signInButton).toBeInTheDocument();
  });

  it("will enable botton 'Sign In' when username & password are not null", () => {
    const component = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const usernameInput = component.getByTestId("login-username-input");
    const passwordInput = component.getByTestId("login-password-input");
    const signInButton = component.getByText(/Sign In/);

    expect(signInButton).toHaveAttribute("disabled");
    
    fireEvent.change(usernameInput, { target: { value: "username" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(signInButton).not.toHaveAttribute("disabled");
  });
});
