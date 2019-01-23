import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

const POSTS_QUERY = gql`
  query allPosts($skip: Int) {
    posts(orderBy: createdAt_DESC, first: 3, skip: $skip) {
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
        <h1> All postSSSS</h1>
        <ul>
          <Query query={POSTS_QUERY}>
            {({ loading, data, fetchMore }) => {
              if (loading) return "...loading";
              const { posts } = data;
              return (
                <>
                  {posts.map(post => (
                    <li key={post.id}>
                      <Link to={`/post/${post.id}`}>
                        <h1>Title: {post.title}</h1>
                      </Link>
                    </li>
                  ))}

                  <li>
                    <button
                      onClick={() =>
                        fetchMore({
                          variables: {
                            skip: posts.length,
                          },
                          updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;
                            return Object.assign({}, prev, {
                              posts: [...prev.posts, ...fetchMoreResult.posts],
                            });
                          },
                        })
                      }
                    >
                      more
                    </button>
                  </li>
                </>
              );
            }}
          </Query>
        </ul>
      </div>
    );
  }
}
