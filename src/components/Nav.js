import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

const Nav = (props) => {
  const nav = useNavigate();
  return (
    <nav className="nav">
      <ul>
        <li className="leftli">
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Home
          </NavLink>
        </li>
        <li className="leftli">
          <NavLink to="/leaderboard">Leaderboard</NavLink>
        </li>
        <li className="leftli">
          <NavLink to="/add">New Poll</NavLink>
        </li>
        <li className="rightli">
            <img
              src={props.currentUser.avatarURL}
              alt={`Avatar of ${props.currentUser.name}`}
              width={50}
              height={50}
            />
            <span>&nbsp;{props.currentUser.id}</span>
            <span>&nbsp;&nbsp;&nbsp;</span>
            <button
              onClick={() => {
                props.dispatch(setAuthedUser(null));
                nav("/");
              }}
            >
              Logout
            </button>
        </li>
        <li></li>
      </ul>
    </nav>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  currentUser: users[authedUser],
});

export default connect(mapStateToProps)(Nav);
