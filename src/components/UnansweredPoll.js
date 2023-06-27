import { Link } from "react-router-dom";
import Poll from "./Poll";

const UnansweredPolls = ({ polls }) => {
  return (
    <div className="polls">
      <h1> Unanswered Polls </h1>
      <ul>
        {polls.length > 0 ? (
          polls
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((poll) => (
              <li key={poll.id}>
                <Link to={`/questions/${poll.id}`}>
                  <Poll id={poll.id} answered={false} />
                </Link>
              </li>
            ))
        ) : (
          <div>No unanswered poll available</div>
        )}
      </ul>
    </div>
  );
};

export default UnansweredPolls;
