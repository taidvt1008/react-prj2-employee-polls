import { connect } from "react-redux";
import { useState } from "react";
import { handleAddPoll } from "../actions/polls";
import { useNavigate } from "react-router-dom";

const NewPoll = ({ dispatch, authedUser }) => {
  const nav = useNavigate();

  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");

  const handleChangeOption1 = (e) => {
    const text = e.target.value;
    setOption1(text);
  };

  const handleChangeOption2 = (e) => {
    const text = e.target.value;
    setOption2(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(handleAddPoll(option1, option2, authedUser));

    setOption1("");
    setOption2("");

    nav("/");
  };

  return (
    <div>
      <h2 className="container center">Would you rather</h2>
      <form className="new-poll" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="optionOne"
          value={option1}
          onChange={handleChangeOption1}
        />{" "}
        &nbsp;&nbsp;&nbsp;OR
        <input
          type="text"
          placeholder="optionTwo"
          value={option2}
          onChange={handleChangeOption2}
        />
        <button
          className="btn"
          type="submit"
          disabled={option1 === "" || option2 === ""}
        >
          Create
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
    authedUser,
  });

export default connect(mapStateToProps)(NewPoll);
