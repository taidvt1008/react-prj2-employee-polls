import { connect } from "react-redux";

const Leaderboard = ({ users }) => {
  let rankingUsers = [];
  for (const [, user] of Object.entries(users)) {
    const { id, name, avatarURL, answers, questions } = user;
    const rankingUser = {
      id,
      name,
      avatarURL,
      answered: Object.keys(answers).length,
      created: questions.length,
      total: Object.keys(answers).length + questions.length,
    };
    rankingUsers.push(rankingUser);
  }
  // rankingUsers.sort((a, b) => b.total - a.total || b.created - a.created);
  rankingUsers.sort((a, b) => b.total - a.total); //don't care about sub-condition

  return (
    <div className="container">
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {rankingUsers.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td><div><img width={30} height={30} src={user.avatarURL} alt={`Avatar of ${user.name}`} />&nbsp;{user.name}</div></td>
                <td>{user.answered}</td>
                <td>{user.created}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(mapStateToProps)(Leaderboard);
