import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { setAuthUser } from "../actions/authUser";

class Login extends Component {
  state = {
    errorMsg: "",
  };

  handleSubmit = (e) => {
    const userID = this.userID.value;
    const { dispatch } = this.props;

    e.preventDefault();

    if (userID !== "") {
      dispatch(setAuthUser(userID));
    } else {
      this.setState({ errorMsg: "You must choose a username" });
    }
  };

  render() {
    const { userNames } = this.props;
    const { errorMsg } = this.state;
    return (
      <Container>
        <Row className="justify-content-center align-items-center vh-100 ">
          <Col xs={12} md={4}>
            <Card bg="light" className="text-center">
              <Card.Header>Login</Card.Header>
              <Card.Body>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="formGridState">
                    <Form.Label>Username</Form.Label>
                    {errorMsg ? (
                      <p className="text-danger">{errorMsg}</p>
                    ) : null}

                    <Form.Control as="select" ref={(id) => (this.userID = id)}>
                      <option value="">Select user</option>
                      {userNames.map((item) => (
                        <option value={item.value} key={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Button type="submit" variant="outline-dark" className="m-3">
                    Login
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    userNames: Object.keys(users).map((id) => ({
      value: id,
      label: users[id].name,
    })),
  };
}

export default connect(mapStateToProps)(Login);
