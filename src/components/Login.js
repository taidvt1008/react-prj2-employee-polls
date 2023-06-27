// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../assets/css/login.css";
import { useState } from "react";
import { checkLoginInfo } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { setAuthedUser } from "../actions/authedUser";

const Login = (props) => {

  const handleChangeUsername = (e) => {
    const text = e.target.value;
    setUsername(text);
  };

  const handleChangePassword = (e) => {
    const text = e.target.value;
    setPassword(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    props.dispatch(showLoading());
    const valid = await checkLoginInfo(userName, password);
    props.dispatch(hideLoading());
    
    if (!valid === true) {
      alert("username or password is invalid, please try again!");
      return;
    }

    props.dispatch(setAuthedUser(userName));
    
    setUsername("");
    setPassword("");
  };

  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-form">
      <div className="login-title">
        <h1>EMPLOYERR POLLS</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            data-testid="login-username-input"
            id="username"
            type="text"
            value={userName}
            placeholder="Username"
            onChange={handleChangeUsername}
          />
        </div>
        <div>
          <input
            data-testid="login-password-input"
            id="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={handleChangePassword}
          />
        </div>
        <button
          data-testid="login-button"
          className="btn-submit"
          type="submit"
          disabled={userName === "" || password === ""}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default connect()(Login);
