import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AnsweredPolls from "./AnsweredPoll";
import UnansweredPolls from "./UnansweredPoll";
import { separatePollsByType } from "../utils/api";

const Dashboard = ({ authedUser, polls }) => {
  const { answeredPolls, unansweredPolls } = separatePollsByType(
    polls,
    authedUser
  );

  return (
    <div className="dashboard">
      <Tabs>
        <TabList>
          <Tab>New Questions</Tab>
          <Tab>Done</Tab>
        </TabList>

        <TabPanel>
          <UnansweredPolls polls={unansweredPolls}/>
        </TabPanel>
        <TabPanel>
          <AnsweredPolls polls={answeredPolls}/>
        </TabPanel>
      </Tabs>
    </div>
  );
};

const mapStateToProps = ({ authedUser, polls }) => ({
  authedUser,
  polls,
});

export default connect(mapStateToProps)(Dashboard);
