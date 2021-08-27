import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import { handleSaveQuestionAnswer } from "../actions/users";
import NoMatch from "./NoMatch";

class UnansweredQuestion extends Component {
  state = {
    errorMsg: "",
  };

  handleSubmit = (id, e) => {
    const answer = this.form.answer.value;
    const { dispatch, authUser } = this.props;

    e.preventDefault();

    if (answer !== "") {
      dispatch(handleSaveQuestionAnswer(authUser, id, answer));
    } else {
      this.setState({ errorMsg: "You must make a choice" });
    }
  };

  render() {
    const { question, author } = this.props;

    if (question === null) {
      return <NoMatch />;
    }

    const { optionOne, optionTwo, id } = question;
    const { name, avatarURL } = author;
    const { errorMsg } = this.state;

    return (
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Card bg="light" className="m-3">
            <Card.Header>
              <Image
                src={avatarURL}
                roundedCircle
                fluid
                width="40"
                height="40"
                alt="user avatar"
                className="me-2"
              />
              {name} asks:
              <h3 className="text-center">Would you rather..?</h3>
            </Card.Header>

            <Card.Body className="d-flex justify-content-center">
              <Form
                onSubmit={(e) => this.handleSubmit(id, e)}
                ref={(f) => (this.form = f)}
              >
                {errorMsg ? <p className="text-danger">{errorMsg}</p> : null}
                <Form.Check
                  type="radio"
                  id="optionOne"
                  label={optionOne.text}
                  value="optionOne"
                  name="answer"
                  className="mb-2"
                />
                <Form.Check
                  type="radio"
                  id="optionTwo"
                  label={optionTwo.text}
                  value="optionTwo"
                  name="answer"
                  className="mb-2"
                />
                <Button type="submit" variant="outline-dark">
                  Vote
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps({ questions, users, authUser }, { id }) {
  const question = questions[id];

  return {
    question: question ? question : null,
    author: question ? users[question.author] : null,
    authUser,
  };
}

export default connect(mapStateToProps)(UnansweredQuestion);
