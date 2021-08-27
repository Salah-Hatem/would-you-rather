import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Question from "./Question";

class QuestionList extends Component {
  render() {
    const { idsList, Note } = this.props;

    return (
      <Container>
        {idsList.length ? (
          idsList.map((id) => <Question key={id} id={id} />)
        ) : (
          <p className="text-center">{Note}</p>
        )}
      </Container>
    );
  }
}

export default QuestionList;
