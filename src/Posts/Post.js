import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import UpdatePost from "./UpdatePost";
const SINGLE_POST_BY_ID_QUERY = gql`
  query singlePost($id: ID!) {
    post(where: { id: $id }) {
      id
      title
      body
    }
  }
`;
export default class Post extends Component {
  render() {
    const { match } = this.props;
    return (
      <>
        <h2> Single Post</h2>
        <Query
          query={SINGLE_POST_BY_ID_QUERY}
          variables={{ id: match.params.id }}
        >
          {({ data, loading }) => {
            if (loading) return "...loading";
            const { post } = data;
            return (
              <div>
                <section>
                  <h1>{post.title}</h1>
                </section>
                <section>
                  <h2>edit post</h2>
                  <UpdatePost post={post} />
                </section>
              </div>
            );
          }}
        </Query>
      </>
    );
  }
}
