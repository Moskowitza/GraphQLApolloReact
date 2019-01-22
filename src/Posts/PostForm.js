import React, { Component } from "react";

export default class PostForm extends Component {
  render() {
    return (
      <form>
        <input type="text" name="title" placeholder="New Title" />
        <textarea type="text" name="body" placeholder="Body..." />
        <button>Submit</button>
      </form>
    );
  }
}
