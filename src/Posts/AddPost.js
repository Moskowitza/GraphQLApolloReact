import React, { Component } from "react";
import PostForm from "./PostForm";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const NEW_POST = gql`
  mutation addPost($title: String!, $body: String!) {
    createPost(data: { status: PUBLISHED, title: $title, body: $body }) {
      title
      body
      id
    }
  }
`;

export default class AddPost extends Component {
  render() {
    return (
      <>
        <h1> Add A Post</h1>
        <Mutation mutation={NEW_POST}>
          {createPost => <PostForm onSubmit={createPost} />}
        </Mutation>
      </>
    );
  }
}
