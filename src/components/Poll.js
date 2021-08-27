import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import AnsweredQuestions from "./AnsweredQuestions";
import UnansweredQuestions from "./UnansweredQuestions";

class Poll extends Component {
  render() {
    const { autherUserAnsweres, match } = this.props;
    const id = match.params.id;
    const answered = autherUserAnsweres.hasOwnProperty(id) ? true : false;

    return (
      <Fragment>
        {answered ? (
          <AnsweredQuestions id={id} />
        ) : (
          <UnansweredQuestions id={id} />
        )}
      </Fragment>
    );
  }
}

function mapStateToProps({ authUser, users }) {
  const autherUserAnsweres = users[authUser].answers;

  return {
    autherUserAnsweres,
  };
}

export default connect(mapStateToProps)(Poll);
