import React, { Component } from "react";
// import PostForm from "./PostForm";
import gql from "graphql-tag";

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
        <form>
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
      </>
    );
  }
}
