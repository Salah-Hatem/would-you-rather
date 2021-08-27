import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { connect } from "react-redux";

class Question extends Component {
  render() {
    const { question, author } = this.props;
    const { optionOne, id } = question;
    const { name, avatarURL } = author;
    return (
      <Row className=" justify-content-center">
        <Col className="" xs={12} md={6}>
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
            <Card.Body className="text-center">
              <Card.Text>{optionOne.text.slice(0, 50)}...?</Card.Text>
              <Link to={`/questions/${id}`}>
                <Button variant="outline-dark">Show Question...</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps({ questions, users }, { id }) {
  const question = questions[id];

  return {
    question: question ? question : null,
    author: question ? users[question.author] : null,
  };
}

export default connect(mapStateToProps)(Question);
