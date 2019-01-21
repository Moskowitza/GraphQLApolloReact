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
