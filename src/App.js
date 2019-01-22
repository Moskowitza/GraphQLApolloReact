import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Post from "./Posts/Post";
import Posts from "./Posts/Posts";
import AddPost from "./Posts/AddPost";
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
              <h1>Learn GraphQL-Apollo</h1>
              <Link to={"/"}>home</Link>
              <Link to={"/post/new"}>Add</Link>
            </header>
            <Switch>
              <Route exact path="/" component={Posts} />
              <Route path="/posts" component={Posts} />
              <Route exact path="/post/new" component={AddPost} />
              <Route path="/post/:id" component={Post} />
            </Switch>
          </>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
