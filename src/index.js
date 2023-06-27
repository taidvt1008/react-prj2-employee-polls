import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/index.css";

import reducer from "./reducers";
import middleware from "./middleware";
import App from "./components/App";

const store = createStore(reducer, middleware);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
