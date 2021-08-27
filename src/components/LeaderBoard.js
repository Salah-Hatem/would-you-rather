import React, { Component } from "react";
import UserCard from "./UserCard";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";

class LeaderBoard extends Component {
  render() {
    return (
      <Container xs={12} md={4}>
        <h2 className="text-center my-3">
          <small>LeaderBoard</small>
        </h2>
        {this.props.userIDs
          .map((id) => <UserCard key={id} id={id} />)
          .slice(0, 3)}
      </Container>
    );
  }
}

function mapStateToProps({ users }) {
  const sortedUserIDs = Object.keys(users).sort((idA, idB) => {
    const scoreA =
      Object.keys(users[idA].answers).length + users[idA].questions.length;
    const scoreB =
      Object.keys(users[idB].answers).length + users[idB].questions.length;

    return scoreB - scoreA;
  });

  return {
    userIDs: sortedUserIDs,
  };
}

export default connect(mapStateToProps)(LeaderBoard);
