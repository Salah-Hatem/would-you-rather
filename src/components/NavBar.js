import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import { setAuthUser } from "../actions/authUser";
import { connect } from "react-redux";

class NavBar extends Component {
  handleLogout = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;

    dispatch(setAuthUser(null));
  };
  render() {
    const { authUser, users } = this.props;

    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" exact>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/add" exact>
                New Question
              </Nav.Link>
              <Nav.Link as={NavLink} to="/leaderboard" exact>
                Leader Board
              </Nav.Link>
            </Nav>
            <Nav>
              <Container>
                <Image
                  src={users[authUser].avatarURL}
                  roundedCircle
                  fluid
                  width="40"
                  height="40"
                  alt="user avatar"
                />
                <Navbar.Text className="mx-3">
                  Hi, {users[authUser].name}
                </Navbar.Text>

                <Button variant="outline-light" onClick={this.handleLogout}>
                  Logout
                </Button>
              </Container>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

function mapStateToProps({ users, authUser }) {
  return {
    authUser,
    users,
  };
}

export default connect(mapStateToProps)(NavBar);
