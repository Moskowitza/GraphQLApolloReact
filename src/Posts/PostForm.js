import React, { Component } from "react";
import PropTypes from "prop-types";

export default class PostForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    post: PropTypes.object,
  };
  static defaultProps = {
    post: {},
  };
  state = {
    id: this.props.post.id || "",
    title: this.props.post.title || "",
    body: this.props.post.body || "",
  };
  handleInput = e => {
    const formData = {};
    formData[e.target.name] = e.target.value;
    this.setState({ ...formData });
  };
  render() {
    const { id, title, body } = this.state;
    const { onSubmit } = this.props;
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit({
            variables: {
              id,
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
