import React, { Component, Fragment } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import QuestionList from "./QuestionList";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";

class Home extends Component {
  render() {
    const { answeredQuestionIds, unansweredQuestionIds } = this.props;
    return (
      <Container>
        <Fragment>
          <Tabs>
            <Tab eventKey="unanswered" title="Unanswered Questions">
              <QuestionList
                idsList={unansweredQuestionIds}
                Note="No more Questions "
              />
            </Tab>
            <Tab eventKey="answered" title="Answered Questions">
              <QuestionList
                idsList={answeredQuestionIds}
                Note="No Answered Questions"
              />
            </Tab>
          </Tabs>
        </Fragment>
      </Container>
    );
  }
}

function mapStateToProps({ authUser, questions, users }) {
  const answeredQuestionIds = Object.keys(questions)
    .filter((id) => users[authUser].answers.hasOwnProperty(id))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  const unansweredQuestionIds = Object.keys(questions)
    .filter((id) => !users[authUser].answers.hasOwnProperty(id))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  return {
    answeredQuestionIds,
    unansweredQuestionIds,
  };
}

export default connect(mapStateToProps)(Home);
