import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import logo from "./logo.svg";
import "./App.css";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHCMS_URI,
});

const POSTS_QUERY = gql`
  {
    posts {
      id
      title
      body
    }
  }
`;
client.query({ query: POSTS_QUERY }).then(res => console.log(res));

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
        <Query query={POSTS_QUERY}>
          {({ loading, data }) => {
            if (loading) return "...loading";
            const { posts } = data;
            return posts.map(post => <h1 key={post.id}>{post.title}</h1>);
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
