import { connect } from "react-redux";
import { formatDate } from "../utils/api";
import { handleAnswerPoll } from "../actions/polls";
import { updateUserAnswer } from "../actions/users";
import ProgressBar from "@ramonak/react-progress-bar";

const Poll = ({ authedUser, users, poll, answered, dispatch }) => {
  const handleSelect = (e) => {
    const selectedOption = e.target.value;
    const pollID = poll.id;

    dispatch(handleAnswerPoll(authedUser, pollID, selectedOption));
    dispatch(updateUserAnswer(authedUser, pollID, selectedOption));
  };

  const isSelectedOption1 = poll.optionOne.votes.includes(authedUser);

  const optionOneCount = poll.optionOne.votes.length;
  const optionTwoCount = poll.optionTwo.votes.length;
  const activeCount = isSelectedOption1 ? optionOneCount : optionTwoCount;

  const optionOnePercent = Math.round(
    (100 * optionOneCount) / (optionOneCount + optionTwoCount)
  );
  const optionTwoPercent = Math.round(
    (100 * optionTwoCount) / (optionOneCount + optionTwoCount)
  );
  const activePercent = isSelectedOption1 ? optionOnePercent : optionTwoPercent;

  const authorInfo = users[poll.author];
  return (
    <div className="poll">
      <img src={authorInfo.avatarURL} alt={`Avatar of ${authorInfo.name}`} />
      {answered === false ? (
        <div className="poll-info" onChange={handleSelect}>
          <span>{authorInfo.name}</span>
          <div>{formatDate(poll.timestamp)}</div>
          <div>
            <h3 style={{ marginTop: "20px", color: "red" }}>
              Would You Rather
            </h3>
            <label>
              <input data-testid="poll-option1-input" type="radio" name="only-one" value="optionOne" />
              &nbsp;{poll.optionOne.text}
            </label>
            <span> OR</span>
          </div>
          <div>
            <label>
              <input data-testid="poll-option2-input" type="radio" name="only-one" value="optionTwo" />
              &nbsp;{poll.optionTwo.text}
            </label>
          </div>
        </div>
      ) : (
        <div className="poll-info">
          <span>{authorInfo.name}</span>
          <div>{formatDate(poll.timestamp)}</div>
          <div>
            <h3 style={{ marginTop: "20px", color: "red" }}>
              Would You Rather
            </h3>
            &nbsp;{poll.optionOne.text + "  (optionOne)"}
            <span> OR</span>
          </div>
          <div>&nbsp;{poll.optionTwo.text + "  (optionTwo)"}</div>
          <div style={{ marginTop: "20px", color: "green" }}>
            &nbsp;My answer:{" "}
            {isSelectedOption1 === true
              ? poll.optionOne.text + "  (optionOne)"
              : poll.optionTwo.text + "  (optionTwo)"}
          </div>
          <div style={{ marginTop: "20px" }}>
            <ProgressBar
              completed={activePercent}
              borderRadius="0"
              width="450px"
              isLabelVisible={false}
            />
            <span>
              Result: {activeCount}/{optionOneCount + optionTwoCount}
              {" = "}
              {activePercent}
              {"%"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, polls }, { id }) => {
  return {
    authedUser,
    users,
    poll: polls[id],
  };
};

export default connect(mapStateToProps)(Poll);
