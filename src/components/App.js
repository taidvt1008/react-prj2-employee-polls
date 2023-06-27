import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading-bar";
import Nav from "./Nav";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Leaderboard from "./Leaderboard";
import NewPoll from "./NewPoll";
import PollPage from "./PollPage";
import NotFound from "./NotFound";

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);
  
  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        {props.authedUser === null ? (
          <Login />
        ) : (
          <div>
            <Nav />
            <Routes>
              <Route path="/" exact element={<Dashboard />}></Route>
              <Route
                path="/leaderboard"
                exact
                element={<Leaderboard />}
              ></Route>
              <Route path="/questions/:question_id" element={<PollPage />} />
              <Route path="/add" exact element={<NewPoll />}></Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        )}
      </div>
    </Fragment>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(App);
