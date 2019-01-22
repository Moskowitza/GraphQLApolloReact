import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
const POSTS_QUERY = gql`
  query allPosts {
    posts {
      id
      title
      body
    }
  }
`;

export default class Posts extends Component {
  render() {
    return (
      <div>
        {" "}
        <Query query={POSTS_QUERY}>
          {({ loading, data }) => {
            if (loading) return "...loading";
            const { posts } = data;
            return posts.map(post => <h1 key={post.id}>{post.title}</h1>);
          }}
        </Query>
      </div>
    );
  }
}
