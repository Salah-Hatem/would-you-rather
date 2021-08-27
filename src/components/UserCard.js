import React, { Component } from "react";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";

class UserCard extends Component {
  render() {
    const { user } = this.props;
    const { name, avatarURL, answers, questions } = user;
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
              />{" "}
              {name}
            </Card.Header>
            <Card.Body className="d-flex justify-content-center">
              <Card.Text>
                Answered Questions: {Object.keys(answers).length}
                <br />
                Created Questions: {questions.length}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              Score: {Object.keys(answers).length + questions.length}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps({ users }, { id }) {
  return {
    user: users[id],
  };
}

export default connect(mapStateToProps)(UserCard);
