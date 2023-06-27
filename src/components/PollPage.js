import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import Poll from "./Poll";
import NotFound from "./NotFound";

const PollPage = ({ authedUser, polls }) => {
  const { question_id } = useParams();

  if (!(question_id in polls)) {
    return <NotFound />;
  }

  const poll = polls[question_id];
  const answered =
    poll.optionOne.votes.includes(authedUser) ||
    poll.optionTwo.votes.includes(authedUser);

  return <Poll id={question_id} answered={answered} />;
};

const mapStateToProps = ({ authedUser, polls }) => ({
  authedUser,
  polls,
});

export default connect(mapStateToProps)(PollPage);
