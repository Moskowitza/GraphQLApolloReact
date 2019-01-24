# Part 1

create a [graphCMS](https://graphcms.com) account  
I used github to authenticate  
create new project : "DemoSite"  
use free developer account
--  
Define your schema  
Define your Model posts  
from the right side add fields

Title can be a String
Body can be a markdown, so we can format our blog with markdown

On the Left Menu Create a post. How Meta, it's this post.

## API Explorer

Check out a Query using the API explorer

```
{
  posts {
    id
    title
    body
  }
}
```

# Part 2

Let's Create a React App!!!

- create-react-app Aaron's Start
  npx is the new way to create a react app without installing "create-react-app"

```
> npx create-react-app GraphQLApolloReact
```

switch to the directory and yarn start

```
> cd GraphQLApolloReact
> yarn start
```

## Set up Apollo

yarn add our apollo packages

```
> yarn add apollo-boost react-apollo graphql graphql-tag
```

In our App component we'll create a client using ApolloBoost.

```
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHCMS_URI,
});
```

We then pass that client to our ApolloProvider and wrap our code in the provider

```
<ApolloProvider client={client}>
    ...our app stuff
</ ApolloProvider>
```

## create a .env file

This will allow us to keep our secrets

- add '.env' to your .gitignore
- yarn add dotenv
- touch .env
- REACT_APP_GRAPHCMS_URI="the uri string from your graphcms up"
- After your inports in index.js

```
require("dotenv").config();
```

## Open your graphCMS

Under settings in the graphCMS package set your Public API Permissions to "open"

# Part 3

Import the Query from react-apollo in App.js

```
import { ApolloProvider, Query } from "react-apollo";

```

Create a Query to pass in to our Query Component.
Name your query to have access to it in Apollo Dev tools

```
const POSTS_QUERY = gql`
 query allPosts {
    posts {
      id
      title
      body
    }
  }
`;
```

The graphql query returns several properties: data, loading, networkStatus, stale  
Pull out the data and map over your posts. React requires a unique key for each element

```
<Query query={POSTS_QUERY}>
    {({ loading, data }) => {
        if (loading) return "...loading";
        const { posts } = data;
        return posts.map(post => <h1 key={post.id}>{post.title}</h1>);
        }}
</Query>
```

# Part 4

Set up our Router using react-router-dom

```
> yarn add react-router-dom
```

Keeping things in App.js

```
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//in the componenet's render return statement
<Router>
    <>
    <Switch>
    <Route exact path="/" component={Posts} />
    <Route exact path="/posts" component={Posts} />
    <Route path="/post/:id" component={Post} />
    </Switch>
    </>
</Router>
```

Create react components for Posts and a single Post. The Posts component will hae a list of blog posts and link to the individual post using the id and react-router-dom Link.
Use the Query from

```
import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
const POSTS_QUERY = gql`
  query allPosts {
    posts {
      id
      title
      body
    }
  }
`;
///in our exported component
<Query query={POSTS_QUERY}>
    {({ loading, data }) => {
    if (loading) return "...loading";
    const { posts } = data;
    return posts.map(post => (
        <div key={post.id}>
        <Link to={`/post/${post.id}`}>
        <h1>Title: {post.title}</h1>
        </Link>
        </div>
    ));
    }}
</Query>
```

Take the post.id from our params to query for the specific post data.

- our query needs to be told the id is required. \$id: ID!
- The ID is passed to the Query in the render

```
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
              <>
                <h1>{post.title}</h1>
                <div>{post.body}</div>
              </>
            );
          }}
        </Query>
      </>
    );
  }
}
```

# Part 5

Mutations in graphGL need data coming in and return something after the data is stored.

```
mutation addPost{
    createPost(data:{
        status:PUBLISHED
        title: "our first mutation"
        body: "New Post body text"
    }){
        title
        body
        id
    }
}
```

Create a component that will add a blog post. We will use the usual syntax of updating a input fields. The value of the input will be set to the state of the component. [Controlled Components](https://reactjs.org/docs/forms.html#controlled-components)

The AddPost.js component will have

- import statements
- Our gql mutation
- state holding our title and body
- onChange event handler that sets the e.target.name=e.target.value
- form inputs that are wrapped in our Mutation Component.

```
<Mutation
    mutation={NEW_POST}
    variables={{
        <!-- Using ES6 we can simply declare our properties and values -->
        title,
        body,
    }}
    >
```

- Set our form submit function

```
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
    ...inputs
    ...button
</form>
)}
```

- the Apollo client wraps everything in App.js so it is not needed in this individual component.

# part 6

Let's konmarie our code by moving the Form out of the AddPost component into a PostForm component. That way we can use the same form whether we are creating a new post or updating an exisiting post. For an existing post, we'd set the state of the form to the existing title and body

## renderProps

Pass the createPost method to the PostForm component. In our AddPost we'd set onSubmit to createPost, but you can imagine passing updatePost from UpdatePost component.

```
{createPost => <PostForm onSubmit={createPost} />}

```

And in our PostForm component update the onSubmit to be passed in by props. The Variables are now set in the PostForm component's onSubmit function.

```
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
    ...The rest of the code
```

# part 7

Update a post using the same form, but this time we'll pass along the post data through props.

- Create a new UpdatePost component
- pass the individual post to that component from within Post.js

```
<UpdatePost post={post} />
```

- UpdatePost.js has a new Mutation declared

```
const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $title: String!, $body: String!) {
    updatePost(
      where: { id: $id }
      data: { status: PUBLISHED, title: $title, body: $body }
    ) {
      title
      body
      id
    }
  }
`;
... and in the component we can reuse our PostForm and pass along post as a prop

  render() {
    const { post } = this.props;
    return (
      <Mutation mutation={UPDATE_POST}>
        {updatePost => <PostForm post={post} onSubmit={updatePost} />}
      </Mutation>
    );
  }
```

The postForm needs some more information to work. Instead of setting state just to empty strings, use the post data if it exists.
And again, add id to the variables being used by the mutation. Set a default prop for posts.

```
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
```

# Pagination

graphCMS API has a way to limit and sort our queries. We'll need to pass in how many to skip when we run our fetchMore function. For our purpose we'll skip the ones already on the page determined by the length of the post array.

```
const POSTS_QUERY = gql`
  query allPosts($skip: Int) {
    posts(orderBy: createdAt_DESC, first: 3, skip: $skip) {
      id
      title
      body
    }
  }
```

use an onClick handler to run our "fetchMore" function. If there are more results we'll then rebuild the posts array. We pass an object to fetchMore that has

- variables
- updateQuery: which is a function.

```
 <button
  onClick={() =>
    fetchMore({
      variables: {
        skip: posts.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
       //if there are no more just return prev
        if (!fetchMoreResult) return prev;
      //otherwise spread them into our posts array
        return Object.assign({}, prev, {
        posts: [...prev.posts, ...fetchMoreResult.posts],
        });
      },
    })
  }
 >
  ➕
</button>
```

# Next steps

## Optimistic UI

## Apollo Persistent Cache

## Apollo Link State

## Authentication

[HowToGraphQL](https://www.howtographql.com/react-apollo/5-authentication/)
