import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Post from "./Posts/Post";
import Posts from "./Posts/Posts";
import "./App.css";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHCMS_URI,
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <>
            <header>
              <h1>Learn Apollo</h1>
            </header>
            <Switch>
              <Route exact path="/" component={Posts} />
              <Route exact path="/" component={Posts} />
              <Route path="/post/:id" component={Post} />
            </Switch>
          </>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
