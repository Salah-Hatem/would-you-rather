import React, { Component, Fragment } from "react";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import { Container } from "react-bootstrap";
import "../App.css";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import Poll from "./Poll";
import { handleInitialData } from "../actions/shared";
import { connect } from "react-redux";
import NoMatch from "./NoMatch";

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { authUser } = this.props;

    return (
      <Container>
        <Router>
          {authUser === null ? (
            <Route render={() => <Login />} />
          ) : (
            <Fragment>
              <NavBar />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/add" component={NewQuestion} />
                <Route path="/leaderboard" component={LeaderBoard} />
                <Route path="/questions/:id" component={Poll} />
                <Route component={NoMatch} />
              </Switch>
            </Fragment>
          )}
        </Router>
      </Container>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}

export default connect(mapStateToProps, { handleInitialData })(App);
