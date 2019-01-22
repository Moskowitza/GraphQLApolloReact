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
  state = {
    title: "",
    body: "",
  };
  handleInput = e => {
    const formData = {};
    formData[e.target.name] = e.target.value;
    this.setState({ ...formData });
  };
  render() {
    const { title, body } = this.state;
    return (
      <>
        <h1> Add A Post</h1>
        <Mutation
          mutation={NEW_POST}
          variables={{
            title,
            body,
          }}
        >
          {createPost => (
            <form
              onSubmit={e => {
                e.preventDefault();
                createPost()
                  .then(() => {
                    this.setState({
                      title: "",
                      body: "",
                    });
                  })
                  .catch(err => console.log(err));
              }}
            >
              <input
                name="title"
                type="text"
                value={title}
                onChange={this.handleInput}
                placeholder="New Title"
              />
              <textarea
                name="body"
                type="text"
                value={body}
                onChange={this.handleInput}
                placeholder="Body..."
              />
              <button>Submit</button>
            </form>
          )}
        </Mutation>
      </>
    );
  }
}
