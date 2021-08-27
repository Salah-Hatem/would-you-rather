import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { handleSaveQuestion } from "../actions/questions";
import { connect } from "react-redux";

class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    toHome: false,
  };

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    const { optionOne, optionTwo } = this.state;
    const { dispatch, authUser } = this.props;

    e.preventDefault();

    this.setState(
      {
        optionOne: "",
        optionTwo: "",
        toHome: true,
      },
      () => dispatch(handleSaveQuestion(optionOne, optionTwo, authUser))
    );
  };

  render() {
    const { optionOne, optionTwo, toHome } = this.state;

    if (toHome === true) return <Redirect to="/" />;

    return (
      <Fragment>
        <h2 className="text-center my-3">
          <small>Would You Rather...</small>
        </h2>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Card bg="light" className="m-3 text-center">
              <Card.Body>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="optionOne">
                    <Form.Label>Choice One</Form.Label>
                    <Form.Control
                      type="text"
                      name="optionOne"
                      value={optionOne}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                  <div className="d-flex">
                    <hr className="my-auto flex-grow-1" />
                    <h3 className="px-4">OR</h3>
                    <hr className="my-auto flex-grow-1" />
                  </div>
                  <Form.Group controlId="optionTwo">
                    <Form.Label>Choice Two</Form.Label>
                    <Form.Control
                      type="text"
                      name="optionTwo"
                      value={optionTwo}
                      onChange={this.handleInputChange}
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="outline-dark"
                    disabled={optionOne === "" || optionTwo === ""}
                    className="mt-3"
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}

export default connect(mapStateToProps)(NewQuestion);
