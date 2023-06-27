import { Link } from "react-router-dom";
import Poll from "./Poll";

const AnsweredPolls = ({ polls }) => {
  return (
    <div className="polls">
      <h1> Answered Polls </h1>
      <ul>
        {polls.length > 0 ? (
          polls
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((poll) => (
              <li key={poll.id}>
                <Link to={`/questions/${poll.id}`}>
                  <Poll id={poll.id} answered={true}/>
                </Link>
              </li>
            ))
        ) : (
          <div>No answered poll available</div>
        )}
      </ul>
    </div>
  );
};

export default AnsweredPolls;
