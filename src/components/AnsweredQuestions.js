import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import Image from "react-bootstrap/Image";
import NoMatch from "./NoMatch";
import Badge from "react-bootstrap/Badge";
import { ListGroup, ListGroupItem } from "react-bootstrap";

class AnsweredQuestions extends Component {
  render() {
    const { question, author, authUser } = this.props;

    if (question === null) {
      return <NoMatch />;
    }

    const { optionOne, optionTwo } = question;
    const { name, avatarURL } = author;
    const totalVotes = optionOne.votes.length + optionTwo.votes.length;
    const optionOnePercent = Math.round(
      (optionOne.votes.length / totalVotes) * 100
    );
    const optionTwoPercent = Math.round(
      (optionTwo.votes.length / totalVotes) * 100
    );

    let optionOneColor = "";
    let optionTwoColor = "";

    if (optionOne.votes.includes(authUser)) {
      optionOneColor = "border border-success";
    }
    if (optionTwo.votes.includes(authUser)) {
      optionTwoColor = "border border-success";
    }

    return (
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Card bg="light" className="m-3">
            <Card.Header>
              Asked by: {""}
              <Image
                src={avatarURL}
                roundedCircle
                fluid
                width="40"
                height="40"
                alt="user avatar"
                className="me-2"
              />
              {name}
              <h3 className="text-center">Would you rather..?</h3>
            </Card.Header>

            <Card.Body className=" justify-content-center">
              <ListGroup>
                <ListGroupItem className={optionOneColor}>
                  {optionOne.text}
                  {optionOne.votes.includes(authUser) ? (
                    <Badge
                      bg="success"
                      className="position-absolute top-0 start-100 translate-middle rounded-pill "
                    >
                      Your Choice
                    </Badge>
                  ) : null}
                  <ProgressBar
                    now={optionOnePercent}
                    label={`${optionOnePercent}%`}
                    variant="info"
                  />
                </ListGroupItem>

                <Card.Text className="text-muted">
                  chosen by {optionOne.votes.length} out of {totalVotes} users
                </Card.Text>
                <ListGroupItem className={optionTwoColor}>
                  {optionTwo.text}
                  {optionTwo.votes.includes(authUser) ? (
                    <Badge
                      bg="success"
                      className="position-absolute top-0 start-100 translate-middle rounded-pill "
                    >
                      Your Choice
                    </Badge>
                  ) : null}
                  <ProgressBar
                    now={optionTwoPercent}
                    label={`${optionTwoPercent}%`}
                    variant="info"
                  />
                </ListGroupItem>

                <Card.Text className="text-muted">
                  chosen by {optionTwo.votes.length} out of {totalVotes} users
                </Card.Text>
              </ListGroup>
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

export default connect(mapStateToProps)(AnsweredQuestions);
