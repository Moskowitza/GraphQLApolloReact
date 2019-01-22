import React, { Component } from "react";

export default class PostForm extends Component {
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
    const { onSubmit } = this.props;
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit({
            variables: {
              title,
              body,
            },
          })
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
    );
  }
}
